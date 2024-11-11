
export function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60);
    const seconds = milliseconds % 60;

    // Aggiungi uno zero iniziale se i secondi sono meno di 10
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
};

export function clearLocalStorage() {
    localStorage.clear();
}

export function playSound(type, options = {}) {
    const sounds = {
        'click': '/sounds/start-click.wav',
        'start-flow': '/sounds/start-flow.wav',
        // Aggiungi altri tipi di suoni qui
    };

    const soundPath = sounds[type];

    if (soundPath) {
        const audio = new Audio(soundPath);
        if (options?.muted) {
            console.log('mutatooo');
            audio.muted = true;
        }
        audio.play();
    } else {
        console.warn(`Sound type "${type}" not found.`);
    }
}
