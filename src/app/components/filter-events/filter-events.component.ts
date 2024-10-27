import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, exhaustMap, map } from 'rxjs';
import { CharacterService } from '../../services/api-marvel/character.service';
import { RestEvent } from '../../models/Rest/RestEvent';
import { EventParameter } from '../../models/Parameters/EventParameters';
import { EventsService } from '../../services/api-marvel/Event.service';
import { FilterService } from '../../services/Utils/Filter.service';

@Component({
  selector: 'filter-event',
  templateUrl: './filter-events.component.html',
  styleUrls: ['./filter-events.component.css'],
  imports: [CommonModule,FormsModule],
  standalone:true  
})
export class filterEventsComponent {
  mensaje: string = "";
  
  events:RestEvent[]=[];
  filter:EventParameter = new EventParameter('8');

  private searchSubject = new BehaviorSubject<Boolean>(false);

  constructor(private eventService:EventsService,private filterService:FilterService ) {

  }

  ngOnInit(): void {   
    this.searchSubject
    .pipe(
      exhaustMap(() => 
                      this.eventService.getAllEvents(this.filter)
                      .pipe(
                        map((res) => 
                          {
                              (this.events = this.events.concat(res.data.results));

                          }
                        )
                      )                    
      )
    ).subscribe() 
    this.eventService.eventUncheck$.subscribe(() => {
      this.events.forEach((item)=> {
          item.checked = false;
      })
    })
  }
  trackByEvent(id:number, event:any) {    
    return event.id;
  }

  borrado(event) {
    if (event == "") {
      this.events = this.events.filter(events => events.checked)
      this.filter.resetIndex();
      this.filter.titleStartsWith = null
      this.searchSubject.next(false);      
    }    
  }

  searchByName(){
    this.events = this.events.filter(events => events.checked)
    this.filter.resetIndex(); 
    this.searchSubject.next(false);
  }

  seeMore(): void {    
    this.filter.nextPage();
    this.searchSubject.next(false);    
  }

  submit(){
    const selectedOptions = this.events.filter(option => option.checked);
    console.log('Selected Options:', selectedOptions);
    const ids:string[] = selectedOptions.map(item => item.id.toString())
    this.filterService.setEventsTofilter(ids)
  }
}
