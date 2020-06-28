import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { webSocket } from 'rxjs/webSocket';
import { ChatMessage } from '../entities/ChatMessage';
import { CommonService } from '../services/common.service';
import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-django-chat',
  templateUrl: './django-chat.component.html',
  styleUrls: ['./django-chat.component.css'],
  providers: [ChatService],
})
export class DjangoChatComponent implements OnInit {
  subject: any;
  public room_name;
  public message: string;
  showMessages: ChatMessage[];
  online_users: { username: string }[];
  to_user_data;
  isOnline:boolean

  constructor(
    private common: CommonService,
    private chatservice: ChatService
  ) {}

  ngOnInit(): void {    
    this.to_user_data = localStorage.getItem('ToUserData') ? JSON.parse(localStorage.getItem('ToUserData')) :console.error('localStorage.getItem("ToUserData") undefined')
    this.room_name = localStorage.getItem('to_user')
      ? localStorage.getItem('to_user')
      : 'undefined';
    this.subject = webSocket(
      `ws://localhost:8000/ws/chat/${
        JSON.parse(localStorage.getItem('UserData')).username
      }/`
    );
    this.subject.subscribe(
      (msg: ChatMessage) => this.showMessages.push(msg),
      (err) => console.error(err),
      () => console.log('Complete')
    );
    let from_user = this.common.getLoggedUser().username;
    this.chatservice
      .getPreviousMessages(from_user, this.room_name)
      .subscribe((messages) => {
        this.chatservice.getOnlineUsers().subscribe((users) => {
          this.online_users = users;
          this.isOnline = this.online_users.find(obj => obj.username == this.to_user_data.username) ? true : false
          this.showMessages = messages;          
        });
      });
  }

  submitMessage() {
    let chatObj = new ChatMessage();
    chatObj.date_sent = new Date().toLocaleString();
    chatObj.message = this.message;
    chatObj.from_user = localStorage.getItem('UserData')
      ? JSON.parse(localStorage.getItem('UserData')).username
      : console.error('localstorage.getItem("UserData" is undefined or null');
    chatObj.to_user = localStorage.getItem('to_user')
      ? localStorage.getItem('to_user')
      : 'undefined';
    this.showMessages.push(chatObj);
    this.subject.next(chatObj);
    this.message = '';
  }
}
