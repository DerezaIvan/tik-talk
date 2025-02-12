import { Component, input } from '@angular/core';
import { PostComment } from '../../data';
import { DateConverterPipe } from '../../pipes';
import { AvatarCircleComponent } from '@tt/common-ui';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, DateConverterPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComment>();
}
