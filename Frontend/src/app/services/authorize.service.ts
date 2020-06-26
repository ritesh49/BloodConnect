import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor(private http:HttpClient) { }
  // djangoUrl = 'https://ritesh49.pythonanywhere.com/';
  private djangoUrl = 'http://localhost:8000/';
  loginUrl = 'api/token';
  regURL = 'api/register';
  signUpUrl = 'api/sign-up';

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
    return this.http.post<any>(this.djangoUrl+this.signUpUrl,regObj).pipe();
  }

  registerUser(userInfo:object):Observable<any>
  {
    return this.http.put<any>(this.djangoUrl+this.regURL,userInfo);
  }
}
