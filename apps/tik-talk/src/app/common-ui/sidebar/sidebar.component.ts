import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../../../../../../libs/common-ui/src/lib/components/svg-icon/svg-icon.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { SubscriberCardComponent } from './susbscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../../../../../libs/profile/src/lib/data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../../../../../libs/common-ui/src/lib/pipes/img-url.pipe';

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
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
