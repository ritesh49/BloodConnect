import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit {

  constructor(private common:CommonService) { }

  receiverData;

  ngOnInit(): void {
    this.common.loadData('receiver')
    .subscribe(data => {
      console.log(data);
      this.receiverData = data;
    })
  }

}
