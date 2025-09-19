import React, { useState } from 'react';
import styled from 'styled-components';
import type { Comment } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { deleteComment, editComment } from '../features/posts/postSlice';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const canEdit = currentUser?.id === comment.authorId;

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(deleteComment({ postId: comment.postId, commentId: comment.id }));
    }
  };

  const handleEdit = () => {
      dispatch(editComment({ ...comment, content: editedContent }));
      setIsEditing(false);
  }

  return (
    <CommentContainer>
      <CommentHeader>
        <Author>{comment.authorId}</Author>
        {canEdit && (
          <ButtonWrapper>
            {isEditing ? (
              <>
                  <ActionButton onClick={handleEdit}>저장</ActionButton>
                  <ActionButton onClick={() => setIsEditing(false)}>취소</ActionButton>
              </>
            ) : (
              <>
                  <ActionButton onClick={() => setIsEditing(true)}>수정</ActionButton>
                  <ActionButton onClick={handleDelete}>삭제</ActionButton>
              </>
            )}
          </ButtonWrapper>
        )}
      </CommentHeader>
      {isEditing ? (
        <EditInput 
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <Content>{comment.content}</Content>
      )}
    </CommentContainer>
  );
};

export default CommentItem;

const CommentContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Author = styled.strong`
  font-size: 1rem;
`;

const Content = styled.p`
  font-size: 1rem;
  color: #495057;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.secondary};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;