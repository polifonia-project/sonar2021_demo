import { Component, OnInit } from '@angular/core';
import {Message} from '../message';
import {Subscription} from 'rxjs';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message: Message;
  messageSubscription: Subscription;

  constructor(
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.messageSubscription = this.messageService.currentMessage.subscribe( message => this.message = message);
    this.messageService.initMessage();
    this.messageService.showMessage('Hello');
  }

}
