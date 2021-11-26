import CONFIG from '../configuracion/config.json';

export const consumir = async () => {
    const ruta = new URL(CONFIG.URL_COMMETS);
    const result = await fetch(ruta);
    return await result.json()
}