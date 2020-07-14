import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../entities/UserInfo';
import { CommonService } from '../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterComponent } from '../toaster/toaster.component';

@Component({
  selector: 'app-dr',
  templateUrl: './dr.component.html',
  styleUrls: ['./dr.component.css']
})
export class DrComponent implements OnInit {

  constructor(private common: CommonService,
    private route:ActivatedRoute,
    private router:Router,
    private toaster:ToasterComponent
    ) { }

  // dr_data: UserInfo[];
  dr_data;
  dr_info:string;  

  ngOnInit(): void {    
    this.dr_info = this.route.snapshot.paramMap.get("name");
    this.common.loadData(this.dr_info)
    .subscribe(data => {
      console.log(data);
      if(localStorage!=undefined && localStorage.getItem("UserData")!=undefined)
        this.dr_data = data.filter(obj => obj.username != JSON.parse(localStorage.getItem('UserData')).username);
      else
        this.dr_data = data
    },err => console.log(err.status))
  }

  get_profile_photo(id){
    return `http://blood-connect-major.herokuapp.com/api/file/${id}/`;
    // return `http://localhost:8000/api/file/${id}/`;
  }

  chatUser(username:string,first_name:string,to_user_data) {
    if(localStorage!=undefined && localStorage.getItem("UserData")!=undefined)
    {
      localStorage.setItem('ToUserData',JSON.stringify(to_user_data))
      localStorage.setItem('to_user',username);
      this.router.navigateByUrl(`chat/${first_name}`);
    }
    else
    {
      this.toaster.showInfo('Please Login , before contacting any user');
      this.router.navigateByUrl('login')
    }
  }

}
