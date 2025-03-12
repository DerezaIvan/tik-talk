import { ChatConnectionWSParams } from '../interfaces/chat-ws-service.interface';

interface ChatWSServiceService {}

export class ChatWSNativeService implements ChatWSServiceService {
  #socket: WebSocket | null = null;

  connect(params: ChatConnectionWSParams) {
    if (this.#socket) return;
    this.#socket = new WebSocket(params.url, [params.token]);

    this.#socket.onmessage = (event: MessageEvent) => {
      //   TODO обработка сообщения
      params.handleMessage(JSON.parse(event.data));
    };

    this.#socket.onclose = () => {
      console.log('А чо это вы тут делаете ? Кино - давно кончилось');
    };
  }

  sendMessage(text: string, chatId: number) {
    this.#socket?.send(
      JSON.stringify({
        text,
        chat_id: chatId,
      }),
    );
  }

  disconnect() {
    this.#socket?.close();
  }
}
