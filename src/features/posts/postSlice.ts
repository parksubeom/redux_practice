// src/features/posts/postsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Post, Comment, PostsState } from '../../types';

const initialState: PostsState = {
  posts: [],
  followedAuthors: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload); // 새 게시물을 맨 앞에 추가
    },
    editPost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(p => p.id !== action.payload);
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        post.comments.push(action.payload);
      }
    },
    editComment: (state, action: PayloadAction<Comment>) => {
        const post = state.posts.find(p => p.id === action.payload.postId);
        if(post) {
            const commentIndex = post.comments.findIndex(c => c.id === action.payload.id);
            if(commentIndex !== -1) {
                post.comments[commentIndex] = action.payload;
            }
        }
    },
    deleteComment: (state, action: PayloadAction<{ postId: string; commentId: string }>) => {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        post.comments = post.comments.filter(c => c.id !== action.payload.commentId);
      }
    },
    toggleLike: (state, action: PayloadAction<{ postId: string; userId: string }>) => {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        const likeIndex = post.likes.indexOf(action.payload.userId);
        if (likeIndex >= 0) {
          post.likes.splice(likeIndex, 1); // 이미 좋아요 누른 경우 취소
        } else {
          post.likes.push(action.payload.userId); // 좋아요 추가
        }
      }
    },
    toggleFollow: (state, action: PayloadAction<string>) => {
        const authorId = action.payload;
        const index = state.followedAuthors.indexOf(authorId);
        if(index >= 0) {
            state.followedAuthors.splice(index, 1); // 언팔로우
        } else {
            state.followedAuthors.push(authorId); // 팔로우
        }
    }
  },
});

export const { 
    addPost, editPost, deletePost, 
    addComment, editComment, deleteComment, 
    toggleLike, toggleFollow 
} = postsSlice.actions;
export default postsSlice.reducer;