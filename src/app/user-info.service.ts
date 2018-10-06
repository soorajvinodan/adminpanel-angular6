import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  usrName: string;
  uEm : string;
  instituteNm : string;
  constructor() {
    this.usrName = "John Doe";
    this.uEm = "";
    this.instituteNm = "";
   }
}
