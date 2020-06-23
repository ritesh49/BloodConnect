import { Component, OnInit } from '@angular/core';
import { ToasterComponent } from '../toaster/toaster.component';
import { AuthorizeService } from '../services/authorize.service';
import { SignUp } from '../entities/SignUp';
import { UserInfo } from '../entities/UserInfo';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerInfo = new UserInfo();
  password:string; secPassword:string;

  constructor(
    private toaster:ToasterComponent,
    private authorize:AuthorizeService,
    private router:Router,
    private common:CommonService    
    ) { }

  ngOnInit() {    
  }

  registerUser(){
    if(this.registerInfo) {
    let regObj = new SignUp();
    regObj.email = this.registerInfo.email;
    regObj.first_name = this.registerInfo.first_name;
    regObj.last_name = this.registerInfo.last_name;
    regObj.password = this.password;
    regObj.username = this.registerInfo.username;
    // For Registering User    
    this.authorize.SignUpUSer(regObj)
      .subscribe(data => {
        console.log(data);
      },
      (err)=>{        
        for(let field in err.error){          
          for(let j=0;j<err.error[field].length;j++){
            if(field == 'username')
              {
                this.toaster.showWarning('Account Already Registered , Try login/PWD');
                this.router.navigate(['login']);                
              }
            else
              this.toaster.showError(field+':-'+err.error[field][j]);
          }
        }
      },() =>{        
        this.authorize.registerUser(this.registerInfo)
        .subscribe(data => {
          console.log(data);
        },err => console.log(err),
        () => {
          let userObj = {
            username:this.registerInfo.username,
            password:this.password
          }
          this.common.userObg=userObj;
          this.router.navigate(['login']);
        })
      });
    }
    else
    {
      if(this.password != this.secPassword)
        this.toaster.showError('Both Passwords Should Match');
      else      
        this.toaster.showWarning('Please Fill The required Fields first before Submitting Form');
    }    
  }
}
