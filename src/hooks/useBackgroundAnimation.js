import { useCallback, useRef } from "react";

export default function useBackgroundAnimation(currentTime, flow, setBgLeft, setBgRigth) {

    const savedBgRigth = useRef(0);
    const savedBgLeft = useRef(0);

    return useCallback((remainingTime) => {
        let workingTime = (currentTime - remainingTime);
        let movingToRigth = workingTime / currentTime * 100;
        let movingToLeft = 100 - movingToRigth;

        if (flow && movingToRigth > savedBgLeft.current) savedBgLeft.current = 0;
        if (flow && movingToLeft < savedBgRigth.current) savedBgRigth.current = 0;

        if (!flow && movingToLeft < savedBgLeft.current) savedBgLeft.current = 0;
        if (!flow && movingToRigth > savedBgRigth.current) savedBgRigth.current = 0;

        if (savedBgLeft.current === 0 && savedBgRigth.current === 0) {
            setBgLeft(flow ? movingToRigth : movingToLeft);
            setBgRigth(flow ? movingToLeft : movingToRigth);
        }
    }, [setBgLeft, setBgRigth, currentTime, flow]);
}