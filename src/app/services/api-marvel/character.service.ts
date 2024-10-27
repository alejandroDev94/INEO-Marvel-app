import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { environment } from "../../../environment/environment";

import * as mock from '../../../assets/mock.json'; 
import { ApiResponse } from "../../models/ApiResponse";
import { HttpParameters } from "../../models/HttpParameters";
import { CharacterParameter } from "../../models/CharacterParameter";



@Injectable({providedIn:'root'})
export class CharacterService extends HttpParameters<CharacterParameter> {
    private readonly _http = inject(HttpClient);

    private baseUrl = 'https://gateway.marvel.com';
    

    getAllCharacters(filter?:CharacterParameter):Observable<ApiResponse<any>> {
        
        // Auth https://developer.marvel.com/documentation/authorization
        
          // if(environment.production){
            // return of(mock);  
          // } else {
        return this._http.get<ApiResponse<any>>(this.baseUrl+'/v1/public/characters', { params: this.getHttpParams(filter) });  
          // }          
    }

}