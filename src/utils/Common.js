
export function formatTime(milliseconds)
{
    const minutes = Math.floor(milliseconds / 60);
    const seconds = milliseconds % 60;
    
    // Aggiungi uno zero iniziale se i secondi sono meno di 10
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
};

export function hexToFilter(hex)
{
    hex = hex.replace('#', '');
    
    // Converti in RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calcola i valori per il filtro
    const brightness = (r * 299 + g * 587 + b * 114) / 1000 / 255;
    const saturate = Math.max(r, g, b) / 255 * 100;
    const hueRotate = Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180 / Math.PI;

    return `brightness(0) saturate(100%) invert(${brightness}) sepia(1) saturate(${saturate}%) hue-rotate(${hueRotate}deg)`;
};


