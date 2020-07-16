import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from '../entities/ChatMessage';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}
  private djangoUrl = 'http://localhost:8000/';
  // private djangoUrl = 'https://blood-connect-major.herokuapp.com/';
  private chat_messages_url = 'api/chat/get_chat_messages/';
  private get_online_users = 'api/chat/get_online_users/';

  httpHeaders = {
    headers: new HttpHeaders({
      Authorization: localStorage
        ? localStorage.getItem('TokenInfo')
          ? 'Bearer ' + JSON.parse(localStorage.getItem('TokenInfo')).access
          : 'localstorage.getItem("TokenInfo") Undefined'
        : 'localstorage undefined',
      'Content-Type': 'application/json',
    }),
  };

  getPreviousMessages(
    from_user: string,
    to_user: string
  ): Observable<ChatMessage[]> {
    return this.http
      .get<ChatMessage[]>(
        this.djangoUrl +
          this.chat_messages_url +
          from_user +
          '/' +
          to_user +
          '/',
        this.httpHeaders
      )
      .pipe();
  }

  getOnlineUsers(): Observable<{ username: string }[]> {
    return this.http.get<{ username: string }[]>(
      this.djangoUrl + this.get_online_users,
      this.httpHeaders
    );
  }
}
