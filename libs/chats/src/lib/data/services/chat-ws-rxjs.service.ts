import {
  ChatConnectionWSParams,
  ChatWSService,
} from '../interfaces/chat-ws-service.interface';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/webSocket';
import { finalize, Observable, tap } from 'rxjs';
import { ChatWSMessage } from '../interfaces';

export class ChatWsRxjsService implements ChatWSService {
  #socket: WebSocketSubject<ChatWSMessage> | null = null;

  connect(params: ChatConnectionWSParams): Observable<ChatWSMessage> {
    if (!this.#socket) {
      this.#socket = webSocket({
        url: params.url,
        protocol: [params.token],
      });
    }

    return this.#socket.asObservable().pipe(
      tap((message) => params.handleMessage(message)),
      finalize(() =>
        console.log('А чо это вы тут делаете ? Примеры сёстрам задеваете?'),
      ),
    );
  }

  sendMessage(text: string, chatId: number) {
    this.#socket?.next({
      text,
      chat_id: chatId,
    });
  }

  disconnect() {
    this.#socket?.complete();
  }
}
