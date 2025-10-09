import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import {
  deletePost,
  editPost,
  addComment,
  toggleLike,
  toggleFollow,
} from "../features/posts/postsSlice";
import CommentItem from "../components/CommentItem";
import type { Comment } from "../types";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 게시물 및 사용자 정보 가져오기
  const post = useAppSelector((state) =>
    state.posts.posts.find((p) => p.id === id)
  );
  const { currentUser } = useAppSelector((state) => state.auth);
  const { followedAuthors } = useAppSelector((state) => state.posts);

  // 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post?.title || "");
  const [editedContent, setEditedContent] = useState(post?.content || "");
  const [comment, setComment] = useState("");

  if (!post) {
    return (
      <PostContainer>
        <p>게시물을 찾을 수 없습니다.</p>
      </PostContainer>
    );
  }

  // 계산된 상태
  const isAuthor = currentUser?.id === post.authorId;
  const isLiked = currentUser ? post.likes.includes(currentUser.id) : false;
  const isFollowing = followedAuthors.includes(post.authorId);

  // 이벤트 핸들러
  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(deletePost(post.id));
      navigate("/");
    }
  };

  const handleEditSubmit = () => {
    if (!editedTitle.trim() || !editedContent.trim()) return;
    dispatch(editPost({ ...post, title: editedTitle, content: editedContent }));
    setIsEditing(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !currentUser) {
      if (!currentUser) alert("로그인이 필요합니다.");
      return;
    }
    const newComment: Comment = {
      id: Date.now().toString(),
      postId: post.id,
      authorId: currentUser.id,
      content: comment,
      createdAt: new Date().toISOString(),
    };
    dispatch(addComment(newComment));
    setComment("");
  };

  const handleLike = () => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }
    dispatch(toggleLike({ postId: post.id, userId: currentUser.id }));
  };

  const handleFollow = () => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }
    dispatch(toggleFollow(post.authorId));
  };

  return (
    <PostContainer>
      {isEditing ? (
        // --- 게시물 수정 모드 ---
        <EditForm>
          <EditTitleInput
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <EditTextarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <EditActions>
            <ActionButton onClick={handleEditSubmit}>저장</ActionButton>
            <ActionButton onClick={() => setIsEditing(false)}>
              취소
            </ActionButton>
          </EditActions>
        </EditForm>
      ) : (
        // --- 게시물 보기 모드 ---
        <>
          <PostTitle>{post.title}</PostTitle>

          <PostMeta>
            <AuthorInfo>
              <span>
                by <strong>{post.authorId}</strong>
              </span>
              {currentUser && currentUser.id !== post.authorId && (
                <FollowButton onClick={handleFollow} $following={isFollowing}>
                  {isFollowing ? "팔로잉" : "팔로우"}
                </FollowButton>
              )}
            </AuthorInfo>
            <DateText>{new Date(post.createdAt).toLocaleDateString()}</DateText>
          </PostMeta>

          <PostContent>{post.content}</PostContent>

          <PostActions>
            {isAuthor && (
              <AuthorButtons>
                <ActionButton onClick={() => setIsEditing(true)}>
                  수정
                </ActionButton>
                <ActionButton onClick={handleDelete} $isDelete>
                  삭제
                </ActionButton>
              </AuthorButtons>
            )}
            <LikeButton onClick={handleLike} $liked={isLiked}>
              👍 좋아요 {post.likes.length}
            </LikeButton>
          </PostActions>
        </>
      )}

      {/* --- 댓글 섹션 --- */}
      <CommentsSection>
        <h3>댓글 {post.comments.length}개</h3>
        {currentUser && (
          <CommentInputForm onSubmit={handleCommentSubmit}>
            <CommentArea
              placeholder="댓글을 입력하세요..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <SubmitButton>등록</SubmitButton>
          </CommentInputForm>
        )}
        <CommentList>
          {post.comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </CommentList>
      </CommentsSection>
    </PostContainer>
  );
};
export default DetailPage;

// -------------------------------------------------------------------
// 스타일 컴포넌트
// -------------------------------------------------------------------

// 전체 컨테이너
const PostContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

// 포스트 헤더 및 메타 정보
const PostTitle = styled.h1`
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
  font-weight: 800;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 2rem;
  color: #6c757d;
  font-size: 0.9rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  & strong {
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const DateText = styled.span`
  color: #adb5bd;
`;

const FollowButton = styled.button<{ $following: boolean }>`
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  background-color: ${({ $following, theme }) =>
    $following ? theme.colors.secondary : theme.colors.success};
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

// 포스트 내용
const PostContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.8;
  font-size: 1.15rem;
  min-height: 250px;
  padding: 1rem 0 3rem;
`;

// 액션 버튼 (수정/삭제/좋아요)
const PostActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed #dee2e6;
`;

const AuthorButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-self: flex-end; /* 좋아요 버튼과 별도로 오른쪽 정렬 */
`;

const ActionButton = styled.button<{ $isDelete?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: ${({ $isDelete }) => ($isDelete ? "#f03e3e" : "#e9ecef")};
  color: ${({ $isDelete }) => ($isDelete ? "white" : "#495057")};
  font-weight: 500;
  transition: background 0.2s;
  &:hover {
    background: ${({ $isDelete }) => ($isDelete ? "#c92a2a" : "#ced4da")};
  }
`;

const LikeButton = styled.button<{ $liked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 2rem;
  font-size: 1.2rem;
  border-radius: 30px;
  border: 1px solid
    ${({ $liked, theme }) =>
      $liked ? theme.colors.primary : theme.colors.border};
  background-color: ${({ $liked, theme }) =>
    $liked ? theme.colors.primary : theme.colors.white};
  color: ${({ $liked, theme }) =>
    $liked ? theme.colors.white : theme.colors.dark};
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

// 수정 폼
const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const EditTitleInput = styled.input`
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 2rem;
  font-weight: bold;
`;

const EditTextarea = styled.textarea`
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  min-height: 300px;
  resize: vertical;
  font-size: 1.1rem;
  line-height: 1.7;
`;

const EditActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

// 댓글 섹션
const CommentsSection = styled.div`
  margin-top: 4rem;
  border-top: 2px solid #f1f3f5;
  padding-top: 2rem;

  & h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const CommentInputForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const CommentArea = styled.input`
  flex: 1;
  padding: 1rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CommentList = styled.div`
  /* 댓글 목록에 대한 추가 스타일이 필요하다면 여기에 정의 */
`;
