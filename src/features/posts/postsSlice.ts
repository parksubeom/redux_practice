import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Post, Comment, PostsState } from "../../types";

/**
 * @typedef {Object} PostsState
 * @property {Post[]} posts - 게시물 배열
 * @property {string[]} followedAuthors - 팔로우한 작성자 ID 배열
 */
const initialState: PostsState = {
  posts: [],
  followedAuthors: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    /**
     * 새로운 게시물을 추가합니다.
     * @param {PostsState} state - 현재 상태
     * @param {PayloadAction<Post>} action - 추가할 게시물 정보
     */
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload); // 새 게시물을 맨 앞에 추가
    },
    /**
     * 기존 게시물을 수정합니다.
     * @param {PostsState} state - 현재 상태
     * @param {PayloadAction<Post>} action - 수정할 게시물 정보
     */
    editPost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    /**
     * 특정 ID의 게시물을 삭제합니다.
     * @param {PostsState} state - 현재 상태
     * @param {PayloadAction<string>} action - 삭제할 게시물 ID
     */
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
    /**
     * 특정 게시물에 댓글을 추가합니다.
     * @param {PostsState} state - 현재 상태
     * @param {PayloadAction<Comment>} action - 추가할 댓글 정보
     */
    addComment: (state, action: PayloadAction<Comment>) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        post.comments.push(action.payload);
      }
    },
    /**
     * 특정 게시물의 댓글을 수정합니다.
     * @param {PostsState} state - 현재 상태
     * @param {PayloadAction<Comment>} action - 수정할 댓글 정보
     */
    editComment: (state, action: PayloadAction<Comment>) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        const commentIndex = post.comments.findIndex(
          (c) => c.id === action.payload.id
        );
        if (commentIndex !== -1) {
          post.comments[commentIndex] = action.payload;
        }
      }
    },
    /**
     * 특정 게시물의 댓글을 삭제합니다.
     * @param {PostsState} state - 현재 상태
     * @param {PayloadAction<{ postId: string; commentId: string }>} action - 삭제할 게시물 ID와 댓글 ID
     */
    deleteComment: (
      state,
      action: PayloadAction<{ postId: string; commentId: string }>
    ) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        post.comments = post.comments.filter(
          (c) => c.id !== action.payload.commentId
        );
      }
    },
    /**
     * 특정 게시물에 대한 좋아요를 토글합니다.
     * @param {PostsState} state - 현재 상태
     * @param {PayloadAction<{ postId: string; userId: string }>} action - 좋아요를 누를 게시물 ID와 사용자 ID
     */
    toggleLike: (
      state,
      action: PayloadAction<{ postId: string; userId: string }>
    ) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        const likeIndex = post.likes.indexOf(action.payload.userId);
        if (likeIndex >= 0) {
          post.likes.splice(likeIndex, 1); // 이미 좋아요 누른 경우 취소
        } else {
          post.likes.push(action.payload.userId); // 좋아요 추가
        }
      }
    },
    /**
     * 특정 작성자를 팔로우/언팔로우합니다.
     * @param {PostsState} state - 현재 상태
     * @param {PayloadAction<string>} action - 팔로우할/언팔로우할 작성자 ID
     */
    toggleFollow: (state, action: PayloadAction<string>) => {
      const authorId = action.payload;
      const index = state.followedAuthors.indexOf(authorId);
      if (index >= 0) {
        state.followedAuthors.splice(index, 1); // 언팔로우
      } else {
        state.followedAuthors.push(authorId); // 팔로우
      }
    },
  },
});

export const {
  addPost,
  editPost,
  deletePost,
  addComment,
  editComment,
  deleteComment,
  toggleLike,
  toggleFollow,
} = postsSlice.actions;
export default postsSlice.reducer;
