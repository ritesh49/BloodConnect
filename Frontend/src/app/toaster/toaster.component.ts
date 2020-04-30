import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotifierQueueService } from 'angular-notifier/lib/services/notifier-queue.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})

export class ToasterComponent extends NotifierService {

     showError(msg: string) {
       this.notify('error', msg);
     }

     showInfo(msg: string) {
      this.notify('info', msg);
     }

     showWarning(msg: string) {
      this.notify('warning', msg);
     }

     showSuccess(msg: string) {
      this.notify('success', msg);
     }
}
