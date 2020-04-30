import { Component, OnInit} from '@angular/core';
import { AuthorizeService } from '../services/authorize.service';
import { ToasterComponent } from '../toaster/toaster.component';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [
    AuthorizeService
  ]
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  constructor(
  private authorization : AuthorizeService,
  private toaster:ToasterComponent,
  private router:Router,
  private common:CommonService
  ) { }

  ngOnInit(): void {   
    if(this.common.userObg!=undefined)
    {
      this.username=this.common.userObg.username;
      this.password=this.common.userObg.password
    }
  }

  loginUser(){ 
    this.username = this.username.split('@')[0];
    this.authorization.validateUser(this.username,this.password)
    .subscribe(loginInfo => {
      localStorage.setItem('UserDetails',JSON.stringify(loginInfo));
      this.common.loggedUser = loginInfo;
      if(loginInfo.blood_dr == 'donor')
        this.router.navigate(['donor']);
      else if(loginInfo.blood_dr == 'receiver')
        this.router.navigate(['receiver'])
    },
    err => {
      this.toaster.showError(err.error['detail']);
    },
    () => console.log('Login completed'));
  }
}

