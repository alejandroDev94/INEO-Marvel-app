import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../../services/api-marvel/Comic.service';
import { ComicParameter } from '../../models/Parameters/ComicParameters';
import { FormsModule } from '@angular/forms';
import { RestComic } from '../../models/Rest/RestComic';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, exhaustMap, map } from 'rxjs';
import { CharacterService } from '../../services/api-marvel/character.service';
import { FilterService } from '../../services/Utils/Filter.service';

@Component({
  selector: 'filter-comics',
  templateUrl: './filter-comics.component.html',
  styleUrls: ['./filter-comics.component.css'],
  imports: [CommonModule,FormsModule],
  standalone:true
})
export class filterComicsComponent implements OnInit{
  mensaje: string = "";
  
  comics:RestComic[]=[];
  filter:ComicParameter = new ComicParameter('8');

  private searchSubject = new BehaviorSubject<Boolean>(false);

  constructor(private comicServic:ComicsService,private filterService:FilterService ) {

  }

  ngOnInit(): void {   
    this.searchSubject
    .pipe(
      exhaustMap(() => 
                this.comicServic.getAllComics(this.filter)
                .pipe(
                  map((res) => 
                    {
                        (this.comics = this.comics.concat(res.data.results));

                    }
                  )
                )                    
      )
    ).subscribe() 
    this.comicServic.comicUncheck$.subscribe(() => {
      this.comics.forEach((item)=> {
          item.checked = false;
      })      
    })
  }
  trackByComic(id:number, character:any) {    
    return character.id;
  }

  borrado(event) {
    if (event == "") {
      this.comics = this.comics.filter(comic => comic.checked)
      this.filter.resetIndex();
      this.filter.titleStartsWith = null
      this.searchSubject.next(false);      
    }    
  }

  searchByName(){
    this.comics = this.comics.filter(comic => comic.checked)
    this.filter.resetIndex(); 
    this.searchSubject.next(false);
  }

  seeMore(): void {    
    this.filter.nextPage();
    this.searchSubject.next(false);    
  }

  submit(){
    const selectedOptions = this.comics.filter(option => option.checked);
    console.log('Selected Options:', selectedOptions);
    const ids:string[] = selectedOptions.map(item => item.id.toString())
    this.filterService.setCommicsToFilter(ids);
    
  }
  

}
