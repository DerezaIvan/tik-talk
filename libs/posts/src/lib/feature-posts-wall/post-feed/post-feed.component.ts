import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { PostInputComponent } from '../../ui';
import { PostComponent } from '../post/post.component';
import { GlobalStoreService } from '@tt/shared';
import { Store } from '@ngrx/store';
import { postsActions, selectPosts } from '../../data';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent {
  store = inject(Store);
  feed = this.store.selectSignal(selectPosts);

  constructor() {
    this.store.dispatch(postsActions.fetchPosts({}));
  }

  profile = inject(GlobalStoreService).me;

  isCommentInput = input<boolean>(false);

  onCreatePost(postText: string) {
    if (!postText) return;
    this.store.dispatch(
      postsActions.createPost({
        post: {
          title: 'Клевый пост',
          content: postText,
          authorId: this.profile()!.id,
        },
      }),
    );
  }
}
