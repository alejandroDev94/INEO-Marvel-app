export class CharacterParameter {
    nameStartsWith:string;
    comics:string;
    events:string;
    limit:string;
    offset:string;
    constructor(limit?:string){
        this.offset = '0';
        this.limit = limit ? limit : '16';
    }
    
    setName(nameStartsWith:string) {
        this.nameStartsWith = nameStartsWith;
    }

    setComics(comics:string[]){
        this.comics = comics.join(',');
    }

    setEvents(events:string[]){
        this.events = events.join(',');
    }

    resetParameters(){
        this.offset = '0';        
    }

    nextPage() {
        this.offset = (Number(this.offset)+Number(this.limit)).toString();
    }
}