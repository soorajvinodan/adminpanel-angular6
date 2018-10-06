/**
 * All the requests to server sent from this file.
 * Updated by : Shrabanee
 * Date : 28/09/2018
 */
import { Injectable, NgModule } from "@angular/core"
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { map, filter, scan } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { ajax } from 'rxjs/ajax';
import {environment} from '../environments/environment';

@NgModule ({
    imports: [  ]
})
@Injectable()
export class getInfoService {
    baseUrl : string = environment.serverUrl;
    constructor (private _http : Http){
    }
    private setHeaders(): Headers {
        let headersConfig = {
          'Content-Type': 'application/json'
        };
    
        return new Headers(headersConfig);
      }

    registerCustomer(email : string, instnm : string, una:string, pwdText:string) {
        return this._http.post(`${this.baseUrl}`+"start/register",{em : email, instnm : instnm, name : una, pwd : pwdText}, { headers: this.setHeaders() });
    }
    sendLoginRequest(email : string, pwdText:string) {
        return this._http.post(`${this.baseUrl}`+"start/login",{username : email, password : pwdText}, { headers: this.setHeaders() });
    }
    getClasses(boardName : string) {
        return this._http.get(`${this.baseUrl}`+"class/getClasses/"+boardName, { headers: this.setHeaders() });
    }

    getDetailsForUnit(searchTerms,searchTerm, getNoteBoook) {
        return this._http.post(`${this.baseUrl}`+"class/getInfoOfUnit",{st : searchTerms, stVal : searchTerm}, { headers: this.setHeaders() });
    }
    checkUserLogin() {
        return this._http.get(`${this.baseUrl}`+"start/checkLogin", { headers: this.setHeaders() });
    }
}