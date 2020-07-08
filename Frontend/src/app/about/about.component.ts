import { Component, OnInit } from '@angular/core';
import { ToasterComponent } from '../toaster/toaster.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private toaster:ToasterComponent) { }

  ngOnInit(): void {
  this.toaster.showInfo('This Component Will be implemented in future Versions')
  }

}
