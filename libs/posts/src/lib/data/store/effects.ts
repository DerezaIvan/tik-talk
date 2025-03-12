import { inject, Injectable } from '@angular/core';
import { PostService } from '../services/post.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postsActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsEffects {
  postService = inject(PostService);
  actions$ = inject(Actions);

  fetchPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.fetchPosts),
      switchMap(() =>
        this.postService.fetchPosts().pipe(
          map((posts) => postsActions.postsLoaded({ posts })),
          catchError((err) => {
            console.error('Ошибка загрузки постов', err);
            return of();
          }),
        ),
      ),
    );
  });

  createPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createPost),
      switchMap(({ post }) =>
        this.postService
          .createPost({
            title: post.title,
            content: post.content,
            authorId: post.authorId,
          })
          .pipe(
            map((posts) => postsActions.fetchPosts({})),
            catchError((err) => {
              console.error('Ошибка загрузки постов', err);
              return of();
            }),
          ),
      ),
    );
  });

  fetchComments = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.fetchComments),
      switchMap(({ postId }) =>
        this.postService.getCommentsByPostId(postId).pipe(
          map((comments) => postsActions.commentsLoaded({ comments })),
          catchError((err) => {
            console.error('Ошибка загрузки постов', err);
            return of();
          }),
        ),
      ),
    );
  });

  createComment = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createComment),
      switchMap(({ comment }) =>
        this.postService
          .createComment({
            text: comment.text,
            authorId: comment.authorId,
            postId: comment.postId,
          })
          .pipe(
            map(() => postsActions.fetchComments({ postId: comment.postId })),
            catchError((err) => {
              console.error('Ошибка загрузки постов', err);
              return of();
            }),
          ),
      ),
    );
  });
}
