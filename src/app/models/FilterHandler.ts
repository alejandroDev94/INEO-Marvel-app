
export interface FilterHandler {
    filter(callback:() => void): void;
    executeFilter():void;
}