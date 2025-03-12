import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  Signal,
} from '@angular/core';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { CommentComponent, PostInputComponent } from '../../ui';
import { DateConverterPipe } from '../../pipes/date-converter.pipe';
import { Post, PostComment } from '@tt/interfaces/posts/post.interface';
import { GlobalStoreService } from '@tt/shared';
import { Store } from '@ngrx/store';
import { postsActions, selectComments } from '@tt/posts';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  post = input<Post>();
  profile = inject(GlobalStoreService).me;
  comments!: Signal<PostComment[]>;
  store = inject(Store);

  commentsTwo = computed(() => {
    if (this.comments()?.length > 0) {
      return this.comments();
    }
    return this.post()?.comments;
  });

  ngOnInit() {
    this.store.dispatch(postsActions.fetchPosts({}));
    this.comments = this.store.selectSignal(selectComments(this.post()!.id));
  }

  async onCreated(commentText: string) {
    this.store.dispatch(
      postsActions.createComment({
        comment: {
          text: commentText,
          authorId: this.profile()!.id,
          postId: this.post()!.id,
        },
      }),
    );
  }
}
