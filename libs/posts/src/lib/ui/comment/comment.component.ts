import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PostComment } from '../../data';
import { AvatarCircleComponent } from '@tt/common-ui';
import { DateConverterPipe } from '../../pipes';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, DateConverterPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  comment = input<PostComment>();
}
