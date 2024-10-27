import { FilterHandler } from "../FilterHandler";

export class CharacterParameter implements FilterHandler{
    nameStartsWith:string;
    comics:string;
    events:string;
    limit:string;
    offset:string;
    filterFunction:() => void = null;

    constructor(limit?:string){
        this.offset = '0';
        this.limit = limit ? limit : '16';
    }   
    
    setName(nameStartsWith:string) {
        this.nameStartsWith = nameStartsWith;
    }

    setComics(comics:string[]){
        this.comics = comics ? comics.join(',') : null;
    }

    setEvents(events:string[]){
        this.events =  events ? events.join(','): null;
    }

    resetIndex(){
        this.offset = '0';        
    }

    filter(func:() => void): void {        
        this.filterFunction = func;
    }

    executeFilter(): void {
        this.resetIndex();
        this.filterFunction();
    }
    

    nextPage() {
        this.offset = (Number(this.offset)+Number(this.limit)).toString();
    }
}