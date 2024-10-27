import { HttpParams } from "@angular/common/http";
import CryptoJS from 'crypto-js';


export class HttpParameters<T> {

    params:HttpParams;
    private publicKey = '2e926136cc54f85ed643a6188397c73f';
    private privateKey = '330161833a4cf203f8a3bcff4d1d954572a3a0e8';

    constructor() {      

    }

    getHttpParams(filter?:T) {
        // Auth https://developer.marvel.com/documentation/authorization 
        const ts = new Date().getTime().toString();        
        const hash = CryptoJS.MD5(ts + this.privateKey + this.publicKey).toString();  
        this.params = new HttpParams()
          .set('ts', ts)
          .set('apikey', this.publicKey)
          .set('hash', hash); 
        this.setFilter(filter);
        return this.params;
    }

    setFilter(filter?:T) {
        if (filter){
            const nonNullableEntries = Object.entries(filter).filter(
                ([, value]) => value !== null && value !== undefined && value !== ""
              ) as [keyof T, T[keyof T]][];
            
            nonNullableEntries.forEach((filter) => {
                this.params = this.params.append(filter[0].toString(),filter[1].toString().trim());
            })            
        }                
    }
  

    
}