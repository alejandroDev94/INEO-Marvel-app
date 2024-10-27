import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterService } from './services/api-marvel/character.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterParameter } from './models/CharacterParameter';
import { BehaviorSubject, exhaustMap, map, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy{
  title = 'INEO-Marvel';
  characters: any[] = [];
  characterParameter:CharacterParameter = new CharacterParameter();
  loading: boolean = false;

  @ViewChild('anchor') anchor!: ElementRef;

  private searchSubject = new BehaviorSubject<void>(undefined);
  private observer!: IntersectionObserver;

  constructor(private characterService: CharacterService) {}

  ngOnInit() {    
    this.searchSubject
    .pipe(
      exhaustMap(() => this.characterService.getAllCharacters(this.characterParameter).pipe(
                        map((res) => (this.characters = this.characters.concat(res.data.results))))
    )).subscribe() 

    
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
        this.searchSubject.next();
      }
    }, options);

    this.observer.observe(this.anchor.nativeElement);   
  }

  searchByName(){
    this.characters = []
    this.characterParameter.resetParameters();
    this.searchSubject.next()
  }

  borrado(event) {
    if (event == "") {
      this.characters = []
      this.characterParameter.resetParameters();
      this.characterParameter.nameStartsWith = null
      this.searchSubject.next()
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
