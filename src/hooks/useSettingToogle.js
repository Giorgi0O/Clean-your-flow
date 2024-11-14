import useLocalStorage from "./useLocalStorage";

export function useSettingToogle() {

    const [autoStart, setAutoStart] = useLocalStorage('autoStart', 0);
    const [requestCompleted, setRequestCompleted] = useLocalStorage('requestCompleted', false);
    const [viewCompletedTask, setViewCompletedTask] = useLocalStorage('requestCompleted', false);

    return {
        autoStart, setAutoStart,
        requestCompleted, setRequestCompleted,
        viewCompletedTask, setViewCompletedTask
    }
}