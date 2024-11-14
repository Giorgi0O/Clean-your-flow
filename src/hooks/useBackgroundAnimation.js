import { useCallback, useRef } from "react";

export default function useBackgroundAnimation(currentTime, isflow, setBgLeft, setBgRigth) {

    const savedBgRigth = useRef(0);
    const savedBgLeft = useRef(0);

    return useCallback((remainingTime) => {
        let workingTime = (currentTime - remainingTime);
        let movingToRigth = workingTime / currentTime * 100;
        let movingToLeft = 100 - movingToRigth;

        if (isflow && movingToRigth > savedBgLeft.current) savedBgLeft.current = 0;
        if (isflow && movingToLeft < savedBgRigth.current) savedBgRigth.current = 0;

        if (!isflow && movingToLeft < savedBgLeft.current) savedBgLeft.current = 0;
        if (!isflow && movingToRigth > savedBgRigth.current) savedBgRigth.current = 0;

        if (savedBgLeft.current === 0 && savedBgRigth.current === 0) {
            setBgLeft(isflow ? movingToRigth : movingToLeft);
            setBgRigth(isflow ? movingToLeft : movingToRigth);
        }
    }, [setBgLeft, setBgRigth, currentTime, isflow]);
}