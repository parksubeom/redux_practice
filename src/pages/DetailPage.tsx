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

  const post = useAppSelector((state) =>
    state.posts.posts.find((p) => p.id === id)
  );
  const { currentUser } = useAppSelector((state) => state.auth);
  const { followedAuthors } = useAppSelector((state) => state.posts);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post?.title || "");
  const [editedContent, setEditedContent] = useState(post?.content || "");
  const [comment, setComment] = useState("");

  if (!post) {
    return (
      <Container>
        <p>게시물을 찾을 수 없습니다.</p>
      </Container>
    );
  }

  const isAuthor = currentUser?.id === post.authorId;
  const isLiked = currentUser ? post.likes.includes(currentUser.id) : false;
  const isFollowing = followedAuthors.includes(post.authorId);

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(deletePost(post.id));
      navigate("/");
    }
  };

  const handleEditSubmit = () => {
    dispatch(editPost({ ...post, title: editedTitle, content: editedContent }));
    setIsEditing(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !currentUser) return;
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
    <Container>
      {isEditing ? (
        <EditForm>
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <Button onClick={handleEditSubmit}>저장</Button>
          <Button onClick={() => setIsEditing(false)}>취소</Button>
        </EditForm>
      ) : (
        <>
          <Title>{post.title}</Title>
          <Meta>
            <span>
              by <strong>{post.authorId}</strong>
            </span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </Meta>
          {currentUser && currentUser.id !== post.authorId && (
            <FollowButton onClick={handleFollow} $following={isFollowing}>
              {isFollowing ? "팔로잉" : "팔로우"}
            </FollowButton>
          )}
          <Content>{post.content}</Content>
          <ActionButtons>
            {isAuthor && (
              <>
                <Button onClick={() => setIsEditing(true)}>수정</Button>
                <Button onClick={handleDelete}>삭제</Button>
              </>
            )}
          </ActionButtons>
          <LikeButton onClick={handleLike} $liked={isLiked}>
            👍 좋아요 {post.likes.length}
          </LikeButton>
        </>
      )}

      <CommentsSection>
        <h3>댓글 {post.comments.length}개</h3>
        {currentUser && (
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentInput
              placeholder="댓글을 입력하세요..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <SubmitButton>등록</SubmitButton>
          </CommentForm>
        )}
        {post.comments.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
      </CommentsSection>
    </Container>
  );
};
export default DetailPage;
// ... (styled-components 코드)
const Container = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
`;
const Title = styled.h1`
  margin-bottom: 0.5rem;
`;
const Meta = styled.div`
  display: flex;
  gap: 1rem;
  color: #6c757d;
  margin-bottom: 1.5rem;
`;
const Content = styled.div`
  white-space: pre-wrap;
  line-height: 1.7;
  font-size: 1.1rem;
  min-height: 200px;
  padding: 1rem 0;
`;
const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;
const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: #e9ecef;
  &:hover {
    background: #ced4da;
  }
`;
const LikeButton = styled.button<{ $liked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem auto;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 25px;
  border: 1px solid
    ${({ $liked, theme }) =>
      $liked ? theme.colors.primary : theme.colors.border};
  background-color: ${({ $liked, theme }) =>
    $liked ? theme.colors.primary : theme.colors.white};
  color: ${({ $liked, theme }) =>
    $liked ? theme.colors.white : theme.colors.dark};
  transition: all 0.2s;
`;
const FollowButton = styled.button<{ $following: boolean }>`
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  background-color: ${({ $following, theme }) =>
    $following ? theme.colors.secondary : theme.colors.success};
  color: white;
  margin-bottom: 1rem;
`;
const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: bold;
`;
const Textarea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  min-height: 200px;
  resize: vertical;
  font-size: 1.1rem;
`;
const CommentsSection = styled.div`
  margin-top: 3rem;
  border-top: 1px solid #dee2e6;
  padding-top: 2rem;
`;
const CommentForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;
const CommentInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
`;
const SubmitButton = styled.button`
  padding: 0.8rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 4px;
`;
