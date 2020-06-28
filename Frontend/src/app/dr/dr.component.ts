import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserInfo } from '../entities/UserInfo';
import { CommonService } from '../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dr',
  templateUrl: './dr.component.html',
  styleUrls: ['./dr.component.css']
})
export class DrComponent implements OnInit {

  constructor(private common: CommonService,
    private route:ActivatedRoute,
    private router:Router
    ) { }

  dr_data: UserInfo[];
  dr_info:string;  

  ngOnInit(): void {    
    this.dr_info = this.route.snapshot.paramMap.get("name");
    this.common.loadData(this.dr_info)
    .subscribe(data => {
      console.log(data);      
      this.dr_data = data.filter(obj => obj.username != JSON.parse(localStorage.getItem('UserData')).username);
    },err => console.log(err.status))
  }

  chatUser(username:string,first_name:string,to_user_data) {
    localStorage.setItem('ToUserData',JSON.stringify(to_user_data))
    localStorage.setItem('to_user',username);
    this.router.navigateByUrl(`chat/${first_name}`);
  }

}
