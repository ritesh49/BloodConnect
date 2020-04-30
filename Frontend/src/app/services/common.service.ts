import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }
  public userObg:{username:string,password:string};
  public loggedUser;
  private djangoURL = 'http://localhost:8000'
  private loadDataUrl = '/api/get_data/';

  loadData(dr:string):Observable<any>{
    let httpHeaders = {
      headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': localStorage!=undefined && localStorage.getItem('UserDetails') !=undefined ? 'Bearer ' + JSON.parse(localStorage['UserDetails']).access : ''
    })
  }
    return this.http.get<any>(this.djangoURL+this.loadDataUrl+dr,httpHeaders).pipe();
  }
}
