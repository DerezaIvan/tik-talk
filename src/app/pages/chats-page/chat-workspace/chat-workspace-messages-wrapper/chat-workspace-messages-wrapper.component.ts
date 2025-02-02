import {
  Component,
  DestroyRef,
  inject,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChatsService } from '../../../../data/services/chats.service';
import { Chat } from '../../../../data/interfaces/chats.interface';
import { firstValueFrom, Subscription, switchMap, timer } from 'rxjs';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { MessageInputComponent } from '../../../../common-ui/message-input/message-input.component';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent, DatePipe],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent
  implements OnInit, OnChanges
{
  chatsService = inject(ChatsService);
  destroyRef = inject(DestroyRef);

  private updateMessage!: Subscription;

  chat = input.required<Chat>();
  messages = this.chatsService.activeChatMessages;
  messageGroup: { date: string; messages: any[] }[] = [];

  ngOnInit(): void {
    this.groupMessage();
  }

  public groupMessage() {
    this.messageGroup = this.messages().reduce((acc: any[], item) => {
      const msgDate = item.createdAt.slice(0, 10);
      const existingEntry = acc.find((entry) => entry.date === msgDate);
      if (existingEntry) {
        existingEntry.messages.push(item);
      } else {
        acc.push({
          date: msgDate,
          messages: [item],
        });
      }
      return acc;
    }, []);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['chat'] &&
      changes['chat'].currentValue !== changes['chat'].previousValue
    ) {
      if (this.updateMessage) {
        this.updateMessage.unsubscribe();
      }

      this.updateMessage = timer(0, 4000)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          switchMap(() => this.chatsService.getChatById(this.chat().id)),
        )
        .subscribe((chat) => {
          this.chatsService.activeChatMessages.set(chat.messages);
          this.groupMessage();
        });
    }
  }

  async onSendMessage(messageText: string) {
    await firstValueFrom(
      this.chatsService.senMessage(this.chat().id, messageText),
    );
    // await firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }
}
