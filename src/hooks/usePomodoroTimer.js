import { useCallback, useState, useRef } from "react";
import useNotifications from "./useNotifications";
import useBackgroundAnimation from "./useBackgroundAnimation";
import useLocalStorage from "./useLocalStorage";

export default function usePomodoroTimer({
    setIsActive,
    initialflowDuration,
    initialRestTime,
    initialLongRestTime,
    autoStart,
    setFlowTotalTime,
    setBgLeft,
    setBgRigth,
    onTimerComplete
}) {

    const [flowDuration, setFlowDuration] = useLocalStorage('flowDuration', initialflowDuration);
    const [shortBreakDuration, setShortBreakDuration] = useLocalStorage('shortBreakDuration', initialRestTime);
    const [longBreakDuration, setLongBreakDuration] = useLocalStorage('longBreakDuration', initialLongRestTime);

    const [completedFlowSessions, setCompletedFlowSessions] = useState(0);
    const [sessionCounter, setSessionCounter] = useState(0);
    const isFlow = sessionCounter % 2 === 0;
    const [currentTime, setCurrentTime] = useState(isFlow ? flowDuration : (sessionCounter % 7 === 0) ? longBreakDuration : shortBreakDuration);
    const [timeRemaining, setTimeRemaining] = useState(currentTime);

    const interval = useRef(null);
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);

    const notify = useNotifications();
    const movingBackground = useBackgroundAnimation(currentTime, isFlow, setBgLeft, setBgRigth);

    const handleTimerCompletion = useCallback(() => {
        const newTimerCount = (sessionCounter + 1) % 8;
        const newFlow = newTimerCount % 2 === 0;

        let newTime;
        if (newFlow) {
            newTime = flowDuration;
        }
        else {
            newTime = (newTimerCount % 7 === 0) ? longBreakDuration : shortBreakDuration;
        }

        setCurrentTime(newTime);
        setTimeRemaining(newTime);
        setSessionCounter(newTimerCount);

        onTimerComplete(autoStart);
    }, [sessionCounter, autoStart, flowDuration, longBreakDuration, shortBreakDuration, onTimerComplete]);

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

            if (isFlow) setFlowTotalTime(prev => prev + pastTime);

            if (remainingTime <= 0) {
                clearInterval(interval.current);
                notify.notifyFlow();
                if( isFlow ){
                    setCompletedFlowSessions(prev => prev +1);
                }
                handleTimerCompletion();
            }

        }, 1000);
    }, [currentTime, notify, timeRemaining, isFlow, handleTimerCompletion, movingBackground, setFlowTotalTime, setIsActive]);

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

        setSessionCounter(prev => {
            const newTimerCount = (prev + 1) % 8;
            const nextFlow = newTimerCount % 2 === 0;

            let newTime;
            if (nextFlow) {
                setBgRigth(100);
                setBgLeft(0);
                newTime = flowDuration;
            } else {
                setBgRigth(0);
                setBgLeft(100);
                newTime = (newTimerCount % 7 === 0) ? longBreakDuration : shortBreakDuration;
            }

            setTimeRemaining(newTime);
            setCurrentTime(newTime);
            setIsActive(false);

            return newTimerCount;
        });
    }, [flowDuration, notify, longBreakDuration, shortBreakDuration, setBgLeft, setBgRigth, setIsActive]);

    const saveTimerForm = (tempflowDuration, tempRestTime, tempLongRestTime) => {
        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
        }

        var remaningTime;
        if (isFlow) {
            remaningTime = tempflowDuration - (flowDuration - timeRemaining);
        }
        else {
            if (sessionCounter % 7 === 0) {
                remaningTime = tempLongRestTime - (longBreakDuration - timeRemaining);
            }
            else {
                remaningTime = tempRestTime - (shortBreakDuration - timeRemaining);
            }
        }

        remaningTime = Math.max(0, remaningTime);

        setFlowDuration(tempflowDuration);
        setShortBreakDuration(tempRestTime);
        setLongBreakDuration(tempLongRestTime);
        setTimeRemaining(remaningTime);
        setCurrentTime(remaningTime);
    }

    return {
        flowDuration,
        shortBreakDuration,
        longBreakDuration,
        currentTime,
        timeRemaining,
        setTimeRemaining,
        isFlow,
        sessionCounter,
        completedFlowSessions,
        setSessionCounter,
        start,
        pause,
        next,
        saveTimerForm
    };
}