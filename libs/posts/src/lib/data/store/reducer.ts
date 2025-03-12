import { Post, PostComment } from '@tt/interfaces/posts/post.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { postsActions } from './actions';

export interface PostsState {
  posts: Post[];
  comments: Record<number, PostComment[]>;
}

export const initialState: PostsState = {
  posts: [],
  comments: {},
};

export const postsFeature = createFeature({
  name: 'postsFeature',
  reducer: createReducer(
    initialState,
    on(postsActions.postsLoaded, (state, { posts }) => {
      return {
        ...state,
        posts,
      };
    }),

    on(postsActions.commentsLoaded, (state, { comments }) => {
      const stateComments = { ...state.comments };
      if (comments.length) {
        stateComments[comments[0]?.postId] = comments;
      }
      return {
        ...state,
        comments: stateComments,
      };
    }),
  ),
});
