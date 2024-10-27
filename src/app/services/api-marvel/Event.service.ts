import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HttpParameters } from "../../models/HttpParameters";
import { ComicParameter } from "../../models/Parameters/ComicParameters";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiResponse } from "../../models/Rest/ApiResponse";
import { EventParameter } from "../../models/Parameters/EventParameters";
import { RestEvent } from "../../models/Rest/RestEvent";

@Injectable({providedIn:'root'})
export class EventsService  extends HttpParameters<EventParameter>{
    private readonly _http = inject(HttpClient);

    private baseUrl = 'https://gateway.marvel.com';


    private eventUnchecksSubject = new BehaviorSubject<boolean>(false);
    eventUncheck$ = this.eventUnchecksSubject.asObservable();


    resetCheckedEvents(){
      this.eventUnchecksSubject.next(true);
    }


    getAllEvents(filter?:EventParameter):Observable<ApiResponse<RestEvent>> {
        
        // Auth https://developer.marvel.com/documentation/authorization
        
          // if(environment.production){
            // return of(mock);  
          // } else {
        return this._http.get<ApiResponse<RestEvent>>(this.baseUrl+'/v1/public/events', { params: this.getHttpParams(filter) });  
          // }          
    }

}