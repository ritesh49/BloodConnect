import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { webSocket } from 'rxjs/webSocket';
import { ChatMessage } from '../entities/ChatMessage';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-django-chat',
  templateUrl: './django-chat.component.html',
  styleUrls: ['./django-chat.component.css'],
})
export class DjangoChatComponent implements OnInit {
  subject: any;
  public room_name;
  public message: string;

  constructor(private common:CommonService) {}

  ngOnInit(): void {
    this.room_name = this.common.username
    this.subject = webSocket(`ws://localhost:8000/ws/chat/${JSON.parse(localStorage.getItem('UserData')).username}/`);
    this.subject.subscribe(
      (msg: ChatMessage) => console.log(msg),
      (err) => console.error(err),
      () => console.log('Complete')
  );
  }

  submitMessage() {
    let chatObj = new ChatMessage();
    chatObj.date_sent = new Date().toLocaleString();
    chatObj.message = this.message;
    chatObj.from_user = localStorage.getItem("UserData") ? JSON.parse(localStorage.getItem("UserData")).id : console.error('localstorage.getItem("UserData" is undefined or null');
    chatObj.to_user = this.common.username;    
    debugger
    this.subject.next(chatObj);
    this.message = '';
  }
}
