import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactUs } from '../entities/ContactUs';
import { UserInfo } from '../entities/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }
  public userObg:{username:string,password:string};
  public loggedUser;
  public username:string;
  public authToken = {access:'',refresh:''}
  // private djangoURL = 'https://ritesh49.pythonanywhere.com'
  private djangoURL = 'http://localhost:8000';
  private loadDataUrl = '/api/get_data/';
  private user_data_url = '/api/get_user_data/';
  private contact_us_url = '/api/contact_us/';
  private refresh_token_url = '/api/token/refresh';

  getLoggedUser() {
    try {
      return JSON.parse(localStorage.getItem('UserData'))
    }
    catch(err) {
      console.error(err);
      return 'localstorage  undefined'
    }
  }

  loadData(dr:string):Observable<UserInfo[]>{
    let httpHeaders = {
      headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': localStorage ? localStorage.getItem("TokenInfo") ? 'Bearer ' + JSON.parse(localStorage.getItem("TokenInfo")).access : 'localstorage.getItem("TokenInfo") Undefined' : 'localstorage undefined'
    })
  }
    return this.http.get<UserInfo[]>(this.djangoURL+this.loadDataUrl+dr,httpHeaders).pipe();
  }

  contactUs(contactObj:ContactUs):Observable<ContactUs>
  {
    let httpHeaders = {
      headers:new HttpHeaders({
      'Content-Type':'application/json'      
    })
    }
    return this.http.post<ContactUs>(this.djangoURL+this.contact_us_url,contactObj,httpHeaders).pipe();
  }

  getUserData(username:string,token:any):Observable<UserInfo>{
    let httpHeaders = {
      headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' +token.access
    })
    }
    return this.http.get<UserInfo>(this.djangoURL+this.user_data_url+username,httpHeaders).pipe();
  }

  refreshToken(){
    let headers = {
      headers:new HttpHeaders({
        'Content-Type':'application/json'        
      })
    }
    let refresh = JSON.parse(localStorage.getItem("TokenInfo")).refresh;
    let tokenObj = { refresh }
    this.http.post(this.djangoURL+this.refresh_token_url,JSON.stringify(tokenObj),headers).pipe()
    .subscribe(accessToken => {
      tokenObj["access"] = accessToken["access"];
      localStorage.setItem("TokenInfo",JSON.stringify(tokenObj))
    });
  }
}
