import { Injectable } from "@angular/core";
import { CharacterService } from "../api-marvel/character.service";
import { EventsService } from "../api-marvel/Event.service";
import { ComicsService } from "../api-marvel/Comic.service";

@Injectable({
    providedIn: 'root',
  })
  export class FilterService {    
    
    constructor(private characterService: CharacterService,private eventService:EventsService,private comicsService:ComicsService) {

    }

    setCommicsToFilter(idsComics:string[]) {
        this.characterService.getCharacterParameter().setComics(idsComics);
        this.characterService.getCharacterParameter().setEvents(null);
        this.eventService.resetCheckedEvents();                    
        this.characterService.searchByFilter();    
    }

    setEventsTofilter(idsEvents:string[]) {
      this.characterService.getCharacterParameter().setEvents(idsEvents);
      this.characterService.getCharacterParameter().setComics(null);
      this.comicsService.resetCheckedEvents();                    
      this.characterService.searchByFilter();
    }
  

}