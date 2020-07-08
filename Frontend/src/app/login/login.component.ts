import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from '../services/authorize.service';
import { ToasterComponent } from '../toaster/toaster.component';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthorizeService],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';  
  public verified :number;
  constructor(
    private authorization: AuthorizeService,
    private toaster: ToasterComponent,
    private router: Router,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    this.verified = 0;
    if (this.common.userObg != undefined) {
      this.username = this.common.userObg.username;
      this.password = this.common.userObg.password;
    }
  }

  resetUsernamePass () {
    this.toaster.showInfo('This Feature will be added in future versions');
  }

  resendVerification() {    
    this.authorization.resendVerificationToken(this.username)
    .subscribe(data => {
      if(data['success'])
        this.toaster.showSuccess(data['success'])
      this.verified = 0;
    },err => console.error(err))
  }

  loginUser() {
    if(this.username != '' && this.password != '')
    {
      this.authorization.validateUser(this.username, this.password).subscribe(
        (tokenInfo) => {        
          localStorage.setItem('TokenInfo', JSON.stringify(tokenInfo));
          this.common.authToken = tokenInfo;
          this.common.getUserData(this.username).subscribe((loginInfo) => {
            localStorage.setItem('UserData', JSON.stringify(loginInfo[0]));
            this.common.loggedUser = loginInfo[0];
            if (loginInfo[0].blood_dr == 'donor')
              this.router.navigate(['blood/donor']);
            else if (loginInfo[0].blood_dr == 'receiver')
              this.router.navigate(['blood/receiver']);
          });
        },
        (err) => {                    
          if (err.status == 406) this.verified = 1;
          this.toaster.showError(err['error'].error);          
        }
      );
      }
      else
      this.toaster.showWarning('Fill up Username And password')
  }
}
