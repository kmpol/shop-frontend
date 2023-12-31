import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminMessageService {
  messages: Array<string> = [];
  messageSubject = new Subject<Array<string>>();

  constructor() {}

  add(message: string) {
    this.clear();
    this.messages.push(message);
    this.messageSubject.next(this.messages);
  }

  clear() {
    this.messages = [];
    this.messageSubject.next(this.messages);
  }

  addSpringErrors(error: any) {
    this.clear();
    this.extractErrors(error);

    this.messageSubject.next(this.messages);
  }

  private extractErrors(error: any) {
    if (error.error?.errors?.length > 0) {
      for (let message of error.error.errors) {
        console.log('dupa');
        this.messages.push(
          `Field: ${message.field} -> ${message.defaultMessage}`
        );
      }
    } else {
      this.messages.push(error.message);
    }
  }
}
