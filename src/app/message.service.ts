import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Message} from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();
  defaultTimeOut = 2;

  constructor() { }

  initMessage(): void {
    const message: Message = {
      messageText: '',
      visible: false,
      type: 'info'
    };
    this.messageSource.next(message);
  }

  showMessage(text: string, type: Message['type'] = 'info', time: number = this.defaultTimeOut): void {
    // Display message at the top of the page. Optional timeout in seconds. Currently defaults to 2 seconds.
    let message: Message = {
      messageText: text,
      type,
      visible: true
    };
    this.messageSource.next(message);
    setTimeout((): void => {
      message.visible = false;
      this.messageSource.next(message);
    }, (time * 1000));
  }
}
