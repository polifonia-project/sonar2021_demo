import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Message} from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  initMessage(): void {
    const message: Message = {
      messageText: '',
      visible: false,
      cssClass: ''
    };
    this.messageSource.next(message);
  }

  showMessage(text: string, cssClass: string = '', time: number = 3) {
    let message: Message = {
      messageText: text,
      cssClass: cssClass,
      visible: true
    };
    this.messageSource.next(message);
    setTimeout(function(): void {
      message.visible = false;
      this.messageSource.next(message);
    }, (time * 1000));
  }
}
