import { useEffect, useCallback, useState, useRef } from 'react';
import NoSleep from 'nosleep.js';
import useNotifications from './useNotifications';

export const useActiveSession = (isActive, setModalSetting, setModalTask) => {

    const [isEnableNoSleep, setIsEnableNoSleep] = useState(false);
    const noSleep = useRef();
    const notify = useNotifications();

    const handleBeforeUnload = useCallback((event) => {
        event.preventDefault();
        return (event.returnValue = '');
    }, []);

    const manageNoSleep = useCallback(() => {
        noSleep.current = new NoSleep();
        document.addEventListener(
            `click`,
            function enableNoSleep() {
                document.removeEventListener(`click`, enableNoSleep, false);
                noSleep.current.enable();
                setIsEnableNoSleep(true);
            },
            false
        );
    }, [noSleep, setIsEnableNoSleep]);

    // Effect principale
    useEffect(() => {
        if (!isActive) return;
        setModalSetting(false);

        window.addEventListener('beforeunload', handleBeforeUnload);

        manageNoSleep();

        // Cleanup
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            if (isEnableNoSleep) {
                setIsEnableNoSleep(false);
                noSleep.current.disable();
            }
        };
    }, [isActive, setModalSetting, isEnableNoSleep, setIsEnableNoSleep, manageNoSleep, handleBeforeUnload, notify]);

}