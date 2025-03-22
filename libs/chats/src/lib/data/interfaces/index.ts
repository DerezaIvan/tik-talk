import { ChatWSMessage } from './chat-ws-message.interface';
import { ChatWSService } from './chat-ws-service.interface';
import { Chat, LastMessageRes, Message } from './chats.interface';
import { isErrorMessage, isNewMessage, isUnreadMessage } from './type-guards';

export {
  ChatWSMessage,
  ChatWSService,
  Chat,
  Message,
  LastMessageRes,
  isUnreadMessage,
  isNewMessage,
  isErrorMessage,
};
