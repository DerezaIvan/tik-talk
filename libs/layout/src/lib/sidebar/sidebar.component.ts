import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe, NgClass, NgForOf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { ProfileService } from '@tt/profile';
import { ChatsService, isErrorMessage } from '@tt/chats';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@tt/auth';
import { SubscriberCardComponent } from './susbscriber-card/subscriber-card.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgForOf,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive,
    NgClass,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();

  #chatService = inject(ChatsService);
  #authService = inject(AuthService);
  unreadMessages = this.#chatService.unreadMessagesCount;
  me = this.profileService.me;

  destroyRef = inject(DestroyRef);
  wsSubscribe!: Subscription;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
      count: '',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
      count: 0,
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
      count: '',
    },
  ];

  constructor() {
    this.#chatService.connectWS().pipe(takeUntilDestroyed()).subscribe();
    firstValueFrom(this.profileService.getMe());
  }

  ngOnInit() {
    // firstValueFrom(this.profileService.getMe());
    this.connectWs();
  }

  async reconnect() {
    await firstValueFrom(this.#authService.refreshAuthToken());
    this.connectWs();
  }

  connectWs() {
    this.wsSubscribe?.unsubscribe();
    this.wsSubscribe = this.#chatService
      .connectWS()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((message) => {
        if (isErrorMessage(message)) {
          this.reconnect();
        }
      });
  }
}
