import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HttpParameters } from "../../models/HttpParameters";
import { ComicParameter } from "../../models/Parameters/ComicParameters";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiResponse } from "../../models/Rest/ApiResponse";
import { RestComic } from "../../models/Rest/RestComic";

@Injectable({providedIn:'root'})
export class ComicsService  extends HttpParameters<ComicParameter>{
    private readonly _http = inject(HttpClient);

    private baseUrl = 'https://gateway.marvel.com';
    

    private comicUnchecksSubject = new BehaviorSubject<boolean>(false);
    comicUncheck$ = this.comicUnchecksSubject.asObservable();


    resetCheckedEvents(){
      this.comicUnchecksSubject.next(true);      
    }


    getAllComics(filter?:ComicParameter):Observable<ApiResponse<RestComic>> {
        
        // Auth https://developer.marvel.com/documentation/authorization
        
          // if(environment.production){
            // return of(mock);  
          // } else {
        return this._http.get<ApiResponse<RestComic>>(this.baseUrl+'/v1/public/comics', { params: this.getHttpParams(filter) });  
          // }          
    }

}