import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminMessageService } from '../admin-message.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.scss'],
})
export class AdminMessageComponent implements OnInit, OnDestroy {
  messages: Array<string> = [];
  private destroy$: Subject<void> = new Subject();
  private clickCounter: number = 0;

  constructor(private adminMessageService: AdminMessageService) {}

  ngOnInit(): void {
    this.adminMessageService.messageSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((messages) => {
        this.messages = messages;
        this.closeMessagesAfterTimeout();
      });
  }

  clearMessages(): void {
    this.messages = [];
    this.adminMessageService.clear();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private closeMessagesAfterTimeout() {
    this.clickCounter++;
    setTimeout(() => {
      if (this.clickCounter == 1) {
        this.clearMessages();
      }
      this.clickCounter--;
    }, 3500);
  }
}
