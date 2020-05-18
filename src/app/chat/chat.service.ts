import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';

import { BehaviorSubject } from 'rxjs';
 
export class Message {
  constructor(public content:string,public sentBy:string) {}
}
 
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  readonly token  = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({accessToken: this.token});
  
  conversation  = new BehaviorSubject<Message[]>([]);

  constructor() { }

  // add messagw to souce 
  update(msg:Message)  {
    this.conversation.next([msg]);
  }

  // send ad recieve message from dialogflow
  converse(msg:string) {
    const userMessage = new Message(msg,'user');
    this.update(userMessage);
    return this.client.textRequest(msg)
    .then(res => {
      const speech  = res.result.fulfillment.speech;
      const botMessage = new Message(speech,'bot');
      this.update(botMessage);
    })
  }
}