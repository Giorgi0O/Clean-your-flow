import { useCallback, useState, useRef } from "react";
import useNotifications from "./useNotifications";
import useBackgroundAnimation from "./useBackgroundAnimation";
import { playSound } from "../utils/common";


export default function useFlowmodoroTimer({
    setIsActive,
    setBgLeft,
    setBgRigth,
    autoStart,
    setFlowTotalTime,
    onTimerComplete
}) {

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [flowmoFlow, setFlowmoFlow] = useState(false);

    const interval = useRef(null);
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);

    const { notify } = useNotifications();
    const movingBackground = useBackgroundAnimation(timeRemaining, flowmoFlow, setBgLeft, setBgRigth);

    const start = useCallback(() => {
        setIsActive(true);
        setFlowmoFlow(true);

        startTimeRef.current = Date.now();
        if (timeRemaining > 0) startTimeRef.current = startTimeRef.current - timeRemaining * 1000

        if (interval) clearInterval(interval);

        interval.current = setInterval(() => {

            let now = Date.now();
            const elapsed = Math.round((now - startTimeRef.current) / 1000);

            setFlowTotalTime(prev => prev + 1);

            setTimeRemaining(elapsed);
        }, 1000)
    }, [timeRemaining, setFlowTotalTime, setIsActive]);

    const pause = useCallback(() => {
        playSound('click');

        setIsActive(false);
        clearInterval(interval.current);
    }, [setIsActive]);

    const breath = useCallback(() => {
        setIsActive(true);
        setFlowmoFlow(false);

        var breathTime = Math.ceil(timeRemaining / 5);
        setTimeRemaining(breathTime);

        startTimeRef.current = Date.now();
        endTimeRef.current = startTimeRef.current + breathTime * 1000;

        if (interval.current) clearInterval(interval.current);

        interval.current = setInterval(() => {
            const now = Date.now();
            const remainingTime = Math.max(0, Math.round((endTimeRef.current - now) / 1000));

            movingBackground(remainingTime, true);
            setTimeRemaining(remainingTime);

            if (remainingTime <= 0) {
                notify();
                clearInterval(interval.current);
                onTimerComplete(autoStart);
            }

        }, 1000);
    }, [autoStart, movingBackground, notify, onTimerComplete, setIsActive, timeRemaining]);

    return {
        timeRemaining,
        flowmoFlow,
        start,
        breath,
        pause
    }
}