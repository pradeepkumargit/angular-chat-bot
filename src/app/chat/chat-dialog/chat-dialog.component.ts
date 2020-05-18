import { Component, OnInit } from '@angular/core';
import { ChatService,Message} from '../chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
  
  messages: Observable<Message[]>;
  formValue: string;


  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.messages=this.chat.conversation.asObservable().pipe(scan((acc,val)=>acc.concat(val)));

  }

  sendMessage() {
    let me = this;
    this.chat.converse(me.formValue);
    me.formValue = '';
  }

}
