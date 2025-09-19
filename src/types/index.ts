// src/types/index.ts

export interface User {
  id: string;
  // password는 상태에 저장하지 않습니다.
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  title: string;
  content: string;
  createdAt: string;
  hashtags: string[];
  likes: string[]; // 좋아요를 누른 유저 ID 목록
  comments: Comment[];
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
}

export interface PostsState {
  posts: Post[];
  followedAuthors: string[]; // 현재 유저가 팔로우한 작가 ID 목록
}