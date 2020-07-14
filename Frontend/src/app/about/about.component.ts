import { Component, OnInit } from '@angular/core';
import { ToasterComponent } from '../toaster/toaster.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(private toaster: ToasterComponent, private http: HttpClient) {}

  ngOnInit(): void {}
  downloadResume() {
    saveAs(
      'static/front_end/assets/resume/ritesh_resume.pdf',
      'Ritesh_IT_July2020'
    );
    //   let httpHeaders = {
    //     headers:new HttpHeaders({

    //     })
    //   }
    //   httpHeaders["responseType"] = "blob";
    //   var reader = new FileReader();
    //   this.http
    //     // .get<any>('http://localhost:8000/api/download/resume/', {
    //     .get<Blob>('/assets/resume/ritesh_resume.pdf', httpHeaders)
    //     .subscribe(
    //       (res) => {
    //         // let url = URL.createObjectURL(res);
    //         // reader.readAsDataURL(res);
    //         // reader.onloadend = function (e) {
    //         //   window.open(url);
    //         // };
    //         saveAs('Ritesh_IT_July2020.pdf',res);
    //       },
    //       (error) => console.log('Error downloading the file.'),
    //       () => console.log('Completed file download.')
    //     );

    // reader.onloadend = function (e) {
    //     window.open(escape(reader.result as string));
    // }
  }

  // download_resume() {
  //   this.http.get(targetUrl,{responseType:ResponseContentType.Blob})
  //       .catch((err)=>{return [do yourself]})
  //       .subscribe((res:Response)=>{
  //         var a = document.createElement("a");
  //         a.href = URL.createObjectURL(res.blob());
  //         a.download = fileName;
  //         // start download
  //         a.click();
  //       })
  // }
}
