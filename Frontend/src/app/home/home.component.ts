import { Component, OnInit } from '@angular/core';
import { ContactUs } from '../entities/ContactUs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public contactInfo = new ContactUs();
  
  constructor() { }

  ngOnInit(): void {
  }

  contactUs(){
    if(this.contactInfo)
    {
      
    }
  }

}
