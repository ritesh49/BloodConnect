import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }
  private djangoUrl = 'http://localhost:8000/';  
  private file_upload_download_url = 'api/file/';

//   downloadFile(userId:number)
//   {
//     this.http.get(this.djangoUrl + this.file_upload_download_url + userId as string).pipe()
//   }
    httpHeaders = {
        headers: new HttpHeaders({
            
        })
    }

  uploadFile(file:FormData,userId:number)
  {
      let httpHeaders = {
          headers: new HttpHeaders({
            'X-CSRFToken': document.cookie
            .split('; ')
            .find((row) => row.startsWith('csrftoken'))
            .split('=')[1],
            'Content-type':'application/json'
          })
      }
      return this.http.post(this.djangoUrl+this.file_upload_download_url+userId as string,file).pipe()
  }
  
}
