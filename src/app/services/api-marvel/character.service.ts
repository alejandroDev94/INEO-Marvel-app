import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { environment } from "../../../environment/environment";

import * as mock from '../../../assets/mock.json'; 
import { ApiResponse } from "../../models/Rest/ApiResponse";
import { HttpParameters } from "../../models/HttpParameters";
import { CharacterParameter } from "../../models/Parameters/CharacterParameter";
import { RestCharacter } from "../../models/Rest/RestCharacter";




@Injectable({providedIn:'root'})
export class CharacterService extends HttpParameters<CharacterParameter> {
    private readonly _http = inject(HttpClient);

    private characterParameter:CharacterParameter;

    characters:RestCharacter[]=[];

    private subject:BehaviorSubject<Boolean>;

    private baseUrl = 'https://gateway.marvel.com';
    
    
    getCharacterParameter(){
      if (!this.characterParameter){
        this.characterParameter = new CharacterParameter();
      }      
      return this.characterParameter
    }

    setSubjectTrigger(setSubject:BehaviorSubject<Boolean>){
      this.subject = setSubject;
    }

    searchByFilter() { 
      this.characterParameter.resetIndex()     
      this.subject.next(true);
    }

    getAllCharacters():Observable<ApiResponse<RestCharacter>> {
        
        // Auth https://developer.marvel.com/documentation/authorization
        
          // if(environment.production){
            // return of(mock);  
          // } else {          
        return this._http.get<ApiResponse<RestCharacter>>(this.baseUrl+'/v1/public/characters', { params: this.getHttpParams(this.characterParameter) });  
          // }          
    }

}