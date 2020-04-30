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

  firstName='';lastName='';email='';FirstPassword='';SecPassword='';birthDate='';phoneNumber='';height='';weight='';gender='';blood='';oldMeds='';medication='';bloodDR='';

  constructor(
    private toaster:ToasterComponent,
    private authorize:AuthorizeService,
    private router:Router,
    private common:CommonService
    ) { }

  ngOnInit(): void {
  }

  validateInputs():number
  {
    if(this.firstName==''&&this.lastName==''&&this.email==''&&this.SecPassword==''&&this.birthDate==''&&this.phoneNumber==''&&this.height==''&&this.weight==''&&this.blood==''&&this.bloodDR=='')
      return 1
  }
  registerUser(){
    let regObj = new SignUp();
    regObj.email = this.email;
    regObj.first_name = this.firstName;
    regObj.last_name = this.lastName;
    regObj.password = this.SecPassword;
    regObj.username = this.email.split('@')[0];    
    if(this.FirstPassword == this.SecPassword && this.firstName!=''&&this.lastName!=''&&this.email!=''&&this.SecPassword!=''&&this.birthDate!=''&&this.phoneNumber!=''&&this.height!=''&&this.weight!=''&&this.blood!=''&&this.bloodDR!=''){
      this.authorize.SignUpUSer(regObj)
      .subscribe(data => {
        console.log(data);
      },
      (err)=>{        
        for(let field in err.error){          
          for(let j=0;j<err.error[field].length;j++){
            if(field == 'username')
              this.toaster.showError('email'+':-'+err.error[field][j]);
            else
              this.toaster.showError(field+':-'+err.error[field][j]);
          }
        }
      },() =>{
        let userInfo = new UserInfo();
        userInfo.bloodGroup = this.blood;userInfo.birth_date = this.birthDate;userInfo.blood_dr = this.bloodDR;userInfo.email=this.email;userInfo.gender=this.gender;userInfo.weight=this.weight;userInfo.height=this.height;userInfo.medications=this.oldMeds;userInfo.username=this.email.split('@')[0];userInfo.phone_no = this.phoneNumber;userInfo.first_name=this.firstName;userInfo.last_name=this.lastName;
        this.authorize.registerUser(userInfo)
        .subscribe(data => {
          console.log(data);
        },err => console.log(err),
        () => {
          let userObj = {
            username:this.email.split('@')[0],
            password:this.FirstPassword
          }
          this.common.userObg=userObj;
          this.router.navigate(['login']);
        })
      });
    }
    else
    {
      if(this.validateInputs()==1)
        this.toaster.showError('Please Fill The required Fields first before Submitting Form');
      else      
        this.toaster.showWarning('Both Passwords Should match');
    }

    console.log(regObj);      
  }
}