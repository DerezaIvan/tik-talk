import {
  Component,
  EventEmitter,
  inject,
  Output,
  Renderer2,
} from '@angular/core';
import { ProfileService } from '../../../../../../libs/profile/src/lib/data/services/profile.service';
import { AvatarCircleComponent } from '../../../../../../libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from '../../../../../../libs/common-ui/src/lib/components/svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [AvatarCircleComponent, FormsModule, SvgIconComponent, CommonModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  r2 = inject(Renderer2);
  me = inject(ProfileService).me;

  postText = '';

  @Output() created: EventEmitter<string> = new EventEmitter();

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost(): void {
    if (!this.postText) return;
    this.created.emit(this.postText);
    this.postText = '';
  }
}
