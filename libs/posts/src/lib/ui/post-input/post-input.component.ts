import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { ProfileService } from '@tt/profile';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [AvatarCircleComponent, NgIf, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  r2 = inject(Renderer2);

  profile = inject(ProfileService).me;
  isCommentInput = input<boolean>(false);
  postId = input<number>(0);

  postText = '';

  @Output() created: EventEmitter<string> = new EventEmitter();

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput();
  }

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost(postText: string): void {
    if (!postText) return;
    this.postText = '';
    this.created.emit(postText);
  }
}
