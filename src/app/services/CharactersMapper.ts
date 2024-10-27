import { HttpParameters } from "../models/HttpParameters";

export class CharactersMapper {

    parameters:HttpParameters;
   
    
    getHttpParameters(): CharactersMapper {
        if (!this.parameters) {
            this.parameters = new HttpParameters();
        }        
        return this;
    }


    setName(name:string) {
        this.parameters.setValueHttpParams('name',name);
    }

    setComics(comics:string[]) {
        this.parameters.setValueHttpParams('comics',comics.join(',') )
    }

    setEvents(events:string[]) {
        this.parameters.setValueHttpParams('events',events.join(',') )
    }

    removeComics() {
        this.parameters.deleteHttpParams('comics');
    }

    removeName() {
        this.parameters.deleteHttpParams('name');
    }

    removeEvents() {
        this.parameters.deleteHttpParams('events');
    }


    
}