
class SoundManager {
    constructor() {
        this.sounds = {};
        this.audioInstances = {};
    }

    init() {
        const soundPaths = {
            'click': '/sounds/start-click.mp3',
            'start-flow': '/sounds/start-flow.mp3',
            'start-flow-muted': '/sounds/start-flow.mp3',
            // Aggiungi altri suoni qui
        };

        Object.entries(soundPaths).forEach(([type, path]) => {
            const audio = new Audio(path);
            audio.preload = 'auto';

            this.audioInstances[type] = Array(3).fill(null).map(() => {
                const instance = new Audio(path);
                if(type === 'start-flow-muted'){
                    instance.muted = true;
                }
                instance.preload = 'auto';
                return instance;
            });
        });
    }

    play(type) {
        if (!this.audioInstances[type]) {
            console.warn(`Sound type "${type}" not found.`);
            return;
        }

        const instances = this.audioInstances[type];
        const availableInstance = instances.find(instance => instance.paused || instance.ended) || instances[0];

        availableInstance.currentTime = 0;

        try {
            const playPromise = availableInstance.play();
            if (playPromise) {
                playPromise.catch(error => {
                    console.warn('Playback failed:', error);
                });
            }
        } catch (error) {
            console.warn('Playback failed:', error);
        }
    }

}
const soundManager = new SoundManager();

export function playSound(type, options = {}) {
    soundManager.play(type, options);
}

export function initSoundManager() {
    soundManager.init();
}