import { useCallback } from "react";
import { playSound } from "../utils/SoundManager";

export default function useNotifications() {

    const notifyFlow = useCallback((type = 'start-flow', options = {}) => {
        playSound(type, options);
    }, []);

    const notifyFlowMuted = useCallback((type = 'start-flow-muted', options = {}) => {
        playSound(type, options);
    }, []);

    const notifyClick = useCallback((options = {}) => {
        playSound('click', options);
    }, []);

    return { 
        notifyFlow,
        notifyFlowMuted,
        notifyClick
    }
}
