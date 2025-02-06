import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat, LastMessageRes, Message } from '../interfaces/chats.interface';
import { ProfileService } from '../../../../../../libs/profile/src/lib/data/services/profile.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;

  activeChatMessages = signal<Message[]>([]);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;

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
