

export function formatTime(milliseconds){
    const minutes = Math.floor(milliseconds / 60);
    const seconds = milliseconds % 60;
    
    // Aggiungi uno zero iniziale se i secondi sono meno di 10
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
};