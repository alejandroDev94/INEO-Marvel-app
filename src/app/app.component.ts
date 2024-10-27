import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterService } from './services/api-marvel/character.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterParameter } from './models/Parameters/CharacterParameter';
import { BehaviorSubject, exhaustMap, map, Observable, Subject } from 'rxjs';
import { ComicsService } from './services/api-marvel/Comic.service';
import { Filter } from './models/Filter';
import { filterComicsComponent } from './components/filter-comics/filter-comics.component';
import { filterEventsComponent } from './components/filter-events/filter-events.component';
import { RestCharacter } from './models/Rest/RestCharacter';
import { ErrorPopupComponent } from './services/Utils/errorpopup/ErrorPopup.Component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule,filterComicsComponent,filterEventsComponent,ErrorPopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy{
  title = 'INEO-Marvel';
  characters: RestCharacter[] = [];
  characterParameter:CharacterParameter;
  loading: boolean = false;

  filters:Filter[] = [];

  @ViewChild('anchor') anchor!: ElementRef;

  private searchSubject = new BehaviorSubject<Boolean>(false);
  private observer!: IntersectionObserver;

  constructor(private characterService: CharacterService,private comicsService:ComicsService) {
    this.characterParameter =  this.characterService.getCharacterParameter();
    this.characterService.setSubjectTrigger(this.searchSubject);
  }

  ngOnInit() {    
    this.searchSubject
    .pipe(
      exhaustMap((reset) => 
                      this.characterService.getAllCharacters()
                      .pipe(
                        map((res) => 
                          {
                            if (reset) {
                              this.characters = []
                            }
                            (this.characters = this.characters.concat(res.data.results));

                          }
                        )
                      )                    
      )
    ).subscribe() 
    
  }



  ngAfterViewInit() {
    // Mueve la inicialización del observer aquí
    const options = {
      root: null,
      threshold: 0.1
    };
    
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.characterParameter.nextPage()
        this.searchSubject.next(false);
      }
    }, options);

    this.observer.observe(this.anchor.nativeElement);   
  }

  filterComics(character:RestCharacter) {

  }


  filterEvents(character:RestCharacter) {
    this.filters = character.getEventsNameCode();
    // this.characterParameter.setEvents(filters)
      
  }

  searchByName(){
    this.characters = [];
    this.characterParameter.resetIndex();
    this.searchSubject.next(false)
  }

  borrado(event) {
    if (event == "") {
      this.characters = []
      this.characterParameter.resetIndex();
      this.characterParameter.nameStartsWith = null
      this.searchSubject.next(false)
    }    
  }

  trackByCharacter(id:number, character:any) {    
    return character.id;
  }


  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect(); // Limpia el observer
    }
  }


}
