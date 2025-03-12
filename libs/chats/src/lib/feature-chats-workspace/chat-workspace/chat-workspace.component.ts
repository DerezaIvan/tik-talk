import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ResizeHeightDirective } from '@tt/common-ui';
import { ChatsService } from '../../data/services/chats.service';

@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    AsyncPipe,
    ResizeHeightDirective,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute);
  chatsService = inject(ChatsService);
  router = inject(Router);

  activeChat$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'new') {
        return this.route.queryParams.pipe(
          filter(({ userId }) => userId),
          switchMap(({ userId }) =>
            this.chatsService.createChat(userId).pipe(
              switchMap((chat) => {
                this.router.navigate(['chats', chat.id]);
                return of(null);
              }),
            ),
          ),
        );
      }
      return this.chatsService.getChatById(id);
    }),
  );
}
