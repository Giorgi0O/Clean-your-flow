import { useCallback } from "react";
import { playSound } from "../utils/utils";

export default function useNotifications() {


    const notify = useCallback(() => {
        playSound('start-flow');
        return;
    }, []);

    return { notify }
}
