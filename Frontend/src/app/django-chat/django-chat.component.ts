import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { webSocket } from 'rxjs/webSocket';
import { ChatMessage } from '../entities/ChatMessage';

@Component({
  selector: 'app-django-chat',
  templateUrl: './django-chat.component.html',
  styleUrls: ['./django-chat.component.css'],
})
export class DjangoChatComponent implements OnInit {
  subject: any;
  public room_name;
  public message: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.room_name = this.route.snapshot.paramMap.get('room_name');
    this.subject = webSocket(`ws://localhost:3000/ws/chat/${this.room_name}/`);
    this.subject.subscribe(
      (msg: ChatMessage) => console.log(msg),
      (err) => console.error(err),
      () => console.log('Complete')
    );
  }

  submitMessage() {
    let chatObj = new ChatMessage();
    chatObj.date = new Date().toLocaleString();
    chatObj.message = this.message;
    chatObj.from = localStorage.getItem("UserData") ? JSON.parse(localStorage.getItem("UserData")).id : console.error('localstorage.getItem("UserData"0 is undefined or null');
    this.subject.next(chatObj);
    this.message = '';
  }
}
