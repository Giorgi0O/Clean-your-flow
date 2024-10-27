import { useCallback, useRef } from "react";

export default function useBackgroundAnimation(currentTime, flow, setBgLeft, setBgRigth) {

    const savedBgRigth = useRef(0);
    const savedBgLeft = useRef(0);

    return useCallback((remainingTime, isTimer) => {
        if (isTimer) {
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
        }
        else {
            let bgMoving = 0.1;

            setBgLeft(prev => Math.min(100, prev + bgMoving));
            setBgRigth(prev => Math.max(0, prev - bgMoving));
        }
    }, [setBgLeft, setBgRigth, currentTime, flow]);
}