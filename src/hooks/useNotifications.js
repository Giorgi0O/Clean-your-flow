import { useRef, useCallback } from "react";
import { playSound } from "../utils/common";

export default function useNotifications() {

    const requestNotify = useRef(0);

    const notify = useCallback(() => {
        if (document.visibilityState === 'visible') {
            playSound('start-flow');
            return;
        }
        if (Notification.permission === "granted") {
            playSound('start-flow');
        }
        else {
            if (requestNotify.current === 0) {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        playSound('start-flow');
                    }
                });

                requestNotify.current = 1;
            }
        }
    }, []);

    return { notify }
}
