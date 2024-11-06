import { useCallback, useState, useRef } from "react";
import useNotifications from "./useNotifications";
import { playSound } from "../utils/utils";
import { useLocalStorage } from "./useLocalStorage";


export default function useFlowmodoroTimer({
    initalDivisionFactor,
    setIsActive,
    setBgLeft,
    setBgRigth,
    autoStart,
    setFlowTotalTime,
    onTimerComplete
}) {

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [divisionFactor, setDivisionFactor] = useLocalStorage("divisionFactor" ,initalDivisionFactor);
    const [flow, setFlow] = useState(false);

    const interval = useRef(null);
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);

    const { notify } = useNotifications();

    const start = useCallback(() => {
        setIsActive(true);
        setFlow(true);
        setBgRigth(100);
        setBgLeft(0);

        startTimeRef.current = Date.now();

        if (interval) clearInterval(interval);

        interval.current = setInterval(() => {

            let now = Date.now();
            const elapsed = Math.round((now - startTimeRef.current) / 1000);

            setFlowTotalTime(prev => prev + elapsed);

            setTimeRemaining(elapsed);
        }, 1000)
    }, [setBgLeft, setBgRigth, setFlowTotalTime, setIsActive]);

    const breath = useCallback(() => {
        setIsActive(true);
        setFlow(false);
        setBgRigth(0);
        setBgLeft(100);

        var breathTime = Math.ceil(timeRemaining / divisionFactor);
        setTimeRemaining(breathTime);

        startTimeRef.current = Date.now();
        endTimeRef.current = startTimeRef.current + breathTime * 1000;

        if (interval.current) clearInterval(interval.current);

        interval.current = setInterval(() => {
            const now = Date.now();
            const remainingTime = Math.max(0, Math.round((endTimeRef.current - now) / 1000));

            setTimeRemaining(remainingTime);

            if (remainingTime <= 0) {
                notify();
                clearInterval(interval.current);
                onTimerComplete(autoStart);
            }

        }, 1000);
    }, [autoStart, divisionFactor, notify, setBgLeft, setBgRigth, onTimerComplete, setIsActive, timeRemaining]);

    const next = useCallback(() => {
        playSound('click');

        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
        }

        setTimeRemaining(0);
        setIsActive(false);
        setBgRigth(100);
        setBgLeft(0);
    }, [setTimeRemaining, setIsActive, setBgLeft, setBgRigth]);

    const saveDivisionFactor = (divisionFactor) =>{
        setDivisionFactor(divisionFactor);
    }

    return {
        divisionFactor,
        timeRemaining,
        flow,
        setTimeRemaining,
        start,
        breath,
        next,
        saveDivisionFactor
    }
}