import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const previewContent = post.content.length > 100 
    ? `${post.content.substring(0, 100)}...` 
    : post.content;

  return (
    <Card to={`/post/${post.id}`}>
      <Title>{post.title}</Title>
      <Author>by {post.authorId}</Author>
      <Content>{previewContent}</Content>
      <Footer>
        <Meta>
          <span>👍 {post.likes.length}</span>
          <span>💬 {post.comments.length}</span>
        </Meta>
        <Hashtags>
          {post.hashtags.map(tag => <Tag key={tag}>#{tag}</Tag>)}
        </Hashtags>
      </Footer>
    </Card>
  );
};

export default PostCard;

const Card = styled(Link)`
  display: block;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  margin-bottom: 1.5rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.12);
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const Author = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;

const Content = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 1rem;
`;

const Meta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Hashtags = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background-color: #e9ecef;
  color: ${({ theme }) => theme.colors.secondary};
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
`;