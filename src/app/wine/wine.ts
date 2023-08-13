/* Defines the wine entity */
export interface IWine {
    wineId?: number;
    wineName: string;
    wineryName: string; // TODO create winery model if needed 
    vintage: string;
}