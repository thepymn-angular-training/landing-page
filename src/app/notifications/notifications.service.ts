import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private messagesInput: Subject<Command>;
  public messagesOutput: Observable<Command[]>;

  constructor() {
    this.messagesInput = new Subject<Command>();
    this.messagesOutput = this.messagesInput.pipe(
      scan((acc: Command[], value) => {
        if (value.type === 'clear') {
          return acc.filter(message => message.id !== value.id)
        } else {
          return [...acc, value]
        }
      }, [])
    )
  }

  addSuccess(message: string) {
    const id = this.randormId();

    this.messagesInput.next({
      id,
      type: 'success',
      text: message
    });

    setTimeout(() => {
      this.clearMessages(id);
    }, 5000)

  }

  addError(message: string) {
    const id = this.randormId();

    this.messagesInput.next({
      id,
      type: 'error',
      text: message
    });

    setTimeout(() => {
      this.clearMessages(id);
    }, 5000)
  }

  clearMessages(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear'
    })
  }

  randormId() {
    return Math.floor(Math.random() * 100000);
  }
}
