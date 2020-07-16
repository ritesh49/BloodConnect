import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor(private http:HttpClient) { }
  private djangoUrl = 'http://localhost:8000/';
  // private djangoUrl = 'https://blood-connect-major.herokuapp.com/';
  private loginUrl = 'api/token';
  private regURL = 'api/register/';
  private signUpUrl = 'api/sign-up';
  private logoutUrl = 'api/logout/';
  private refresh_verify_token = 'api/key_refresh/';
  private check_username_url = 'api/create/account'

  validateUser(username:string, password:string):Observable<any>
  {    
    let tdvalue = 7 * 1000 * 24; //It is the Time Expiration Delta of JWT
    let userObj = {
      username,
      password,
      tdvalue
    }
    return this.http.post<any>(this.djangoUrl + this.loginUrl, userObj).pipe();
  }

  SignUpUSer(regObj:object):Observable<any>
  {
    let httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': document.cookie ? document.cookie
            .split('; ')
            .find((row) => row.startsWith('csrftoken'))
            .split('=')[1] : 'undefined'          
      })
    }
    return this.http.post<any>(this.djangoUrl+this.signUpUrl,regObj,httpHeaders).pipe();
  }

  registerUser(userInfo:object):Observable<any>
  {
    let httpHeaders = {
      headers: new HttpHeaders({
        'X-CSRFToken': document.cookie ? document.cookie
            .split('; ')
            .find((row) => row.startsWith('csrftoken'))
            .split('=')[1] : 'undefined',
        'Content-type':'application/json'
      })
    }
    return this.http.put<any>(this.djangoUrl+this.regURL,userInfo,httpHeaders);
  }

  checkUsername(username:string) {
    let httpHeaders = {
      headers: new HttpHeaders({
        'Content-type':'application/json'
      })
    }
    return this.http.get(this.djangoUrl+this.check_username_url+'/'+ username+'/',httpHeaders)
  }

  resendVerificationToken(username:string) {    
    let httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': document.cookie ? document.cookie
            .split('; ')
            .find((row) => row.startsWith('csrftoken'))
            .split('=')[1] : 'undefined'          
      })
    }
    return this.http.put(this.djangoUrl+this.refresh_verify_token+username+'/',{'detail':'trial'},httpHeaders).pipe();
  }

  logOutUser() {
    let httpHeaders = {
      headers:new HttpHeaders({
        'Authorization': localStorage ? localStorage.getItem("TokenInfo") ? 'Bearer ' + JSON.parse(localStorage.getItem("TokenInfo")).access : 'localstorage.getItem("TokenInfo") Undefined' : 'localstorage undefined'
      })
    }
    return this.http.delete(this.djangoUrl+this.logoutUrl,httpHeaders).pipe();
  }
}
