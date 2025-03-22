import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ProfileService } from '@tt/profile';
import { AuthService } from '@tt/auth';
import {
  Chat,
  ChatWSMessage,
  ChatWSService,
  isNewMessage,
  isUnreadMessage,
  LastMessageRes,
  Message,
} from '../interfaces';
import { ChatWsRxjsService } from './chat-ws-rxjs.service';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;
  #authService = inject(AuthService);

  activeChatMessages = signal<Message[]>([]);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;

  wsAdapter: ChatWSService = new ChatWsRxjsService();
  unreadMessagesCount = signal<number | null>(0);

  connectWS() {
    return this.wsAdapter.connect({
      url: `${this.baseApiUrl}chat/ws`,
      token: this.#authService.token ?? '',
      handleMessage: this.handleWSMessage,
    }) as Observable<ChatWSMessage>;
  }

  handleWSMessage = (message: ChatWSMessage) => {
    if (!('action' in message)) return;
    if (isUnreadMessage(message)) {
      this.unreadMessagesCount.set(message.data.count);
    }

    if (isNewMessage(message)) {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: false,
          isMine: false,
        },
      ]);
    }
  };

  public createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  public getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats/`);
  }

  public getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message: Message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });
        this.activeChatMessages.set(patchedMessages);
        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      }),
    );
  }

  public senMessage(chatId: number, message: string) {
    return this.http.post<Message>(
      `${this.messageUrl}send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      },
    );
  }
}
