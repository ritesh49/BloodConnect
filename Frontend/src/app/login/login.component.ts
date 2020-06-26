import { Component, OnInit} from '@angular/core';
import { AuthorizeService } from '../services/authorize.service';
import { ToasterComponent } from '../toaster/toaster.component';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

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
  token;
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
    this.username = this.username;
    this.authorization.validateUser(this.username,this.password)
    .subscribe(tokenInfo => {      
      this.common.authToken.access = '';
      this.common.authToken.refresh = '';
      this.token = tokenInfo      
      localStorage.setItem("TokenInfo",JSON.stringify(this.token));
      // debugger;
      this.common.authToken=this.token;
    },
    err => {      
      this.toaster.showError(err.error['detail']);
    },
    () => {
      this.common.getUserData(this.username,this.token)
      .subscribe(loginInfo => {
        localStorage.setItem('UserData',JSON.stringify(loginInfo[0]));
        this.common.loggedUser = loginInfo[0];
        if(loginInfo[0].blood_dr == 'donor')
          this.router.navigate(['blood/donor']);
        else if(loginInfo[0].blood_dr == 'receiver')
          this.router.navigate(['blood/receiver'])
      })
    });
  }
}

