import { Component, inject, input } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PostInputComponent } from '../../ui';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../data/services/post.service';
import { GlobalStoreService } from '@tt/shared';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss'],
})
export class PostFeedComponent {
  postService = inject(PostService);

  feed = this.postService.posts;

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  profile = inject(GlobalStoreService).me;

  isCommentInput = input<boolean>(false);

  onCreatePost(postText: string) {
    if (!postText) return;
    firstValueFrom(
      this.postService.createPost({
        title: 'Клевый пост',
        content: postText,
        authorId: this.profile()!.id,
      }),
    )
      .then(() => {
        postText = '';
      })
      .catch((error) => {
        console.error('Ошибка при создании поста:', error);
      });
  }
}
