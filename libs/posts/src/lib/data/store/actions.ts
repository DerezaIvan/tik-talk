import { createActionGroup, props } from '@ngrx/store';
import {
  CommentCreateDTO,
  Post,
  PostComment,
  PostCreateDTO,
} from '@tt/interfaces/posts/post.interface';

export const postsActions = createActionGroup({
  source: 'posts',
  events: {
    'fetch posts': props<{ page?: number }>(),
    'posts loaded': props<{ posts: Post[] }>(),
    'create post': props<{ post: PostCreateDTO }>(),

    'fetch comments': props<{ postId: number }>(),
    'comments loaded': props<{ comments: PostComment[] }>(),
    'create comment': props<{ comment: CommentCreateDTO }>(),
  },
});
