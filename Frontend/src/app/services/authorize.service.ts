import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor(private http:HttpClient) { }
  djangoUrl = 'http://127.0.0.1:8000/';
  loginUrl = 'api/login';
  regURL = 'api/register';
  signUpUrl = 'api/sign-up';

  validateUser(username:string, password:string):Observable<any>
  {
    let userObj = {
      username,
      password
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
