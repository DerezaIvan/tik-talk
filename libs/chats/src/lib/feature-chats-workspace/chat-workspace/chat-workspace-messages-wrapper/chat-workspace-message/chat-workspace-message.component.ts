import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AvatarCircleComponent } from '@tt/common-ui';
import { DateMessagePipe, Message } from '../../../../data';
import { DateConverterPipe } from '@tt/posts';
import { LuxonModule } from 'luxon-angular';

@Component({
  selector: 'app-chat-workspace-message',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe,
    DateConverterPipe,
    DateMessagePipe,
    LuxonModule,
  ],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
