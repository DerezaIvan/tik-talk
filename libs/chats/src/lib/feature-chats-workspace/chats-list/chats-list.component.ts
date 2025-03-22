import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';
import { ResizeHeightDirective } from '@tt/common-ui';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { ChatsService } from '../../data';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [
    ChatsBtnComponent,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    ResizeHeightDirective,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsListComponent {
  chatService = inject(ChatsService);

  filterChatsControl = new FormControl('');

  chats$ = this.chatService.getMyChats().pipe(
    switchMap((chats) => {
      return this.filterChatsControl.valueChanges.pipe(
        startWith(''),
        map((inputValue) => {
          return chats.filter((chat) => {
            return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
              .toLowerCase()
              .includes(inputValue?.toLowerCase() ?? '');
          });
        }),
      );
    }),
  );
}
