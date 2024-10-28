import { HttpParams } from "@angular/common/http";
import CryptoJS from 'crypto-js';


export class HttpParameters<T> {

    params:HttpParams;
    private publicKey = '2e926136cc54f85ed643a6188397c73f';

    /// IMPORTANT in a real project we will store the private key in the backend/database or other service but never in the frontend.
    // In this assessment we don't have a backend and to make it easy we store it in code. BUT this is a horrible practice not allowed in a real project.
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