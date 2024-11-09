import { useCallback, useState } from "react";
import { playSound } from "../utils/utils";

export default function useNotifications() {

    const [requestNotify, setRequestNotify] = useState(0);

    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    const handleNotifyRequest = useCallback(() => {
        if (!isSafari) {
            // Richiesta permessi per browser non Safari
            if (requestNotify === 0 && Notification.permission !== "granted") {
                Notification.requestPermission();
                setRequestNotify(1);
            }
        }
    }, [requestNotify, setRequestNotify, isSafari]);


    const notify = useCallback(() => {
        if (document.visibilityState === 'visible') {
            playSound('start-flow');
            return;
        }
        if (Notification.permission === "granted") {
            playSound('start-flow');
        }
    }, []);

    return { notify, handleNotifyRequest }
}
