import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {

  constructor(private common:CommonService) { }

  donorData;

  ngOnInit(): void {
    this.common.loadData('donor')
    .subscribe(data => {
      console.log(data);
      this.donorData = data;
    })
  }

}
