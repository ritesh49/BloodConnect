import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from '../services/authorize.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterComponent } from '../toaster/toaster.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private toaster:ToasterComponent,private authorize: AuthorizeService, private router: Router) {}
  profile_url:string;

  ngOnInit(): void {
    if (this.checkLocal())
      this.profile_url = `https://localhost:8000/api/file/${JSON.parse(localStorage.getItem('UserData')).id}/`
    console.log(this.profile_url)
  }

  checkLocal(): boolean {
    if (localStorage.getItem('UserData')) return true;
    else return false;
  }

  signOut() {
    this.authorize.logOutUser().subscribe(
      (data) => {
        if(data['success'])
          this.toaster.showSuccess(data['success']+' Successfully')
      },
      (err) => console.error(err),
      () => {
        this.router.navigateByUrl('home');
        localStorage.removeItem('UserData');
      }
    );
  }
}
