import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from '../services/authorize.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authorize:AuthorizeService) { }

  ngOnInit(): void {
  }

  checkLocal():boolean{    
    if(localStorage.getItem('UserData'))
      return true;
    else
      return false;
  }

  signOut()
  {
    this.authorize.logOutUser()
    .subscribe(data => console.log(data),
    err => console.error(err))
    localStorage.removeItem('UserData');
  }

}
