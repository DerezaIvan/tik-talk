import { Component, input } from '@angular/core';
import { PostComment } from '../../../../data/interfaces/post.interface';
import { AvatarCircleComponent } from '../../../../common-ui/avatar-circle/avatar-circle.component';
import { DateConverterPipe } from '../../../../helpers/pipes/date-converter.pipe';

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
