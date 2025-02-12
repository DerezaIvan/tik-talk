import { Component, inject, input, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { CommentComponent, PostInputComponent } from '../../ui';
import { DateConverterPipe } from '../../pipes/date-converter.pipe';
import { Post, PostComment } from '@tt/interfaces/posts/post.interface';
import { PostService } from '../../data/services/post.service';
import { GlobalStoreService } from '@tt/shared';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    DateConverterPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  post = input<Post>();

  comments = signal<PostComment[]>([]);

  profile = inject(GlobalStoreService).me;

  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated(commentText: string) {
    firstValueFrom(
      this.postService.createComment({
        text: commentText,
        authorId: this.profile()!.id,
        postId: this.post()!.id,
      }),
    )
      .then(async () => {
        const comments = await firstValueFrom(
          this.postService.getCommentsByPostId(this.post()!.id),
        );
        this.comments.set(comments);
      })
      .catch((error) => {
        console.error('Ошибка при создании комментария:', error);
      });
    return;
  }
}
