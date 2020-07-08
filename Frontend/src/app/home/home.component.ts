import { Component, OnInit } from '@angular/core';
import { ContactUs } from '../entities/ContactUs';
import { CommonService } from '../services/common.service';
import { ToasterComponent } from '../toaster/toaster.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public contactInfo = new ContactUs();
  
  constructor(private common:CommonService,
    private toaster:ToasterComponent) { }

  ngOnInit(): void {
    if(localStorage.getItem('UserData'))
    {
      let user_data = JSON.parse(localStorage.getItem('UserData'));
      this.contactInfo.mobile = user_data.phone_no;
      this.contactInfo.email = user_data.email;
      this.contactInfo.name = user_data.first_name + ' ' + user_data.last_name;
    }
  }

  checkLocal():boolean{    
    if(localStorage.getItem('UserData'))
      return true;
    else
      return false;
  }
  
  contactUs(){
    if(Object.keys(this.contactInfo).length == 4)
    {
      this.common.contactUs(this.contactInfo)
      .subscribe(data => {
        this.contactInfo.messages = '';
        this.toaster.showSuccess(data['success']+' To The Respective Authority')
      },
      (err) => this.toaster.showError('Error Occured While Contacting Us'));
    }
    else
    {
      this.toaster.showWarning('Fill Up all Fields before Submitting Form');
    }
  }

}
