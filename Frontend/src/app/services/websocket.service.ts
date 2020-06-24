import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private webSocket:any;
  private webSocketSubject = new BehaviorSubject<any>('ws://localhost:3000/');
  private webSocketObserve = this.webSocketSubject.asObservable();

  listenToSocket(room_name:string):Observable<any> {
    if(this.webSocket){
      return this.webSocketObserve;
    }

    this.webSocket = new WebSocket(`ws://localhost:3000/chat/${room_name}`);

    this.webSocket.onopen = () => console.log(`WebSocket Service Connected to ${room_name}`);

    this.webSocket.onmessage = (res) => this.webSocketSubject.next(res => res.data);
  }

  constructor() { }
}
