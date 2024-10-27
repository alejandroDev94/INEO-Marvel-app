import { FilterHandler } from "../FilterHandler";


export class EventParameter implements FilterHandler{
    nameStartsWith:string;
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