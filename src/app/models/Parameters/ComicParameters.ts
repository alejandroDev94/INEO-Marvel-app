import { FilterHandler } from "../FilterHandler";


export class ComicParameter implements FilterHandler{
    titleStartsWith:string;
    limit:string;
    offset:string;
    filterFunction:() => void = null;

    constructor(limit?:string){
        this.offset = '0';
        this.limit = limit ? limit : '16';
    }   
    
    setName(titleStartsWith:string) {
        this.titleStartsWith = titleStartsWith;
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