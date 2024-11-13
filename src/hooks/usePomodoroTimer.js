import { useCallback, useState, useRef } from "react";
import useNotifications from "./useNotifications";
import useBackgroundAnimation from "./useBackgroundAnimation";

export default function usePomodoroTimer({
    setIsActive,
    initialFlowTime,
    initialRestTime,
    initialLongRestTime,
    autoStart,
    setFlowTotalTime,
    setBgLeft,
    setBgRigth,
    onTimerComplete
}) {

    const [flowTime, setFlowTime] = useState(initialFlowTime);
    const [restTime, setRestTime] = useState(initialRestTime);
    const [longRestTime, setLongRestTime] = useState(initialLongRestTime);

    const [timerCount, setTimerCount] = useState(0);
    const flow = timerCount % 2 === 0;
    const [currentTime, setCurrentTime] = useState(flow ? flowTime : (timerCount % 7 === 0) ? longRestTime : restTime);
    const [timeRemaining, setTimeRemaining] = useState(currentTime);

    const interval = useRef(null);
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);

    const notify = useNotifications();
    const movingBackground = useBackgroundAnimation(currentTime, flow, setBgLeft, setBgRigth);

    const handleTimerCompletion = useCallback(() => {
        const newTimerCount = (timerCount + 1) % 8;
        const newFlow = newTimerCount % 2 === 0;

        let newTime;
        if (newFlow)
            newTime = flowTime;
        else
            newTime = (newTimerCount % 7 === 0) ? longRestTime : restTime;

        setCurrentTime(newTime);
        setTimeRemaining(newTime);
        setTimerCount(newTimerCount);

        onTimerComplete(autoStart);
    }, [timerCount, autoStart, flowTime, longRestTime, restTime, onTimerComplete]);

    const start = useCallback(() => {
        setIsActive(true);

        startTimeRef.current = Date.now();
        endTimeRef.current = startTimeRef.current + currentTime * 1000;

        if (interval.current) clearInterval(interval.current);

        interval.current = setInterval(() => {

            const now = Date.now();
            const remainingTime = Math.max(0, Math.round((endTimeRef.current - now) / 1000));
            const pastTime = timeRemaining - remainingTime;

            movingBackground(remainingTime);
            setTimeRemaining(remainingTime);

            if (flow) setFlowTotalTime(prev => prev + pastTime);

            if (remainingTime <= 0) {
                clearInterval(interval.current);
                notify.notifyFlow();
                handleTimerCompletion();
            }

        }, 1000);
    }, [currentTime, notify, timeRemaining, flow, handleTimerCompletion, movingBackground, setFlowTotalTime, setIsActive]);

    const pause = useCallback(() => {
        setIsActive(false);
        clearInterval(interval.current);

        const remainingTime = currentTime - (currentTime - timeRemaining);
        setCurrentTime(remainingTime);
        setTimeRemaining(remainingTime);

    }, [currentTime, timeRemaining, setIsActive]);

    const next = useCallback(() => {
        notify.notifyClick();

        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
        }

        setTimerCount(prev => {
            const newTimerCount = (prev + 1) % 8;
            const nextFlow = newTimerCount % 2 === 0;

            let newTime;
            if (nextFlow) {
                setBgRigth(100);
                setBgLeft(0);
                newTime = flowTime;
            } else {
                setBgRigth(0);
                setBgLeft(100);
                newTime = (newTimerCount % 7 === 0) ? longRestTime : restTime;
            }

            setTimeRemaining(newTime);
            setCurrentTime(newTime);
            setIsActive(false);

            return newTimerCount;
        });
    }, [flowTime, notify, longRestTime, restTime, setBgLeft, setBgRigth, setIsActive]);

    const saveTimerForm = (tempFlowTime, tempRestTime, tempLongRestTime) => {
        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
        }

        var remaningTime;
        if (flow) {
            remaningTime = tempFlowTime - (flowTime - timeRemaining);
        }
        else {
            if (timerCount % 7 === 0) {
                remaningTime = tempLongRestTime - (longRestTime - timeRemaining);
            }
            else {
                remaningTime = tempRestTime - (restTime - timeRemaining);
            }
        }

        remaningTime = Math.max(0, remaningTime);

        setFlowTime(tempFlowTime);
        setRestTime(tempRestTime);
        setLongRestTime(tempLongRestTime);
        setTimeRemaining(remaningTime);
        setCurrentTime(remaningTime);
    }

    return {
        flowTime,
        restTime,
        longRestTime,
        currentTime,
        timeRemaining,
        setTimeRemaining,
        flow,
        timerCount,
        setTimerCount,
        start,
        pause,
        next,
        saveTimerForm
    };
}