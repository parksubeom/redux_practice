import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { addPost } from "../features/posts/postsSlice";
import PostCard from "../components/PostCard";
import type { Post } from "../types";
const POSTS_PER_PAGE = 5;

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { posts, followedAuthors } = useAppSelector((state) => state.posts);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "myFeed">("all");

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !currentUser) return;

    const newPost: Post = {
      id: Date.now().toString(),
      authorId: currentUser.id,
      title,
      content,
      createdAt: new Date().toISOString(),
      hashtags: hashtags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      likes: [],
      comments: [],
    };

    dispatch(addPost(newPost));
    setTitle("");
    setContent("");
    setHashtags("");
  };

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (activeFilter === "myFeed" && currentUser) {
      result = posts.filter((post) => followedAuthors.includes(post.authorId));
    }
    if (searchTerm) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.hashtags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }
    return result;
  }, [posts, searchTerm, activeFilter, followedAuthors, currentUser]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  return (
    <Container>
      {currentUser && (
        <PostForm onSubmit={handlePostSubmit}>
          <h2>새 게시물 작성</h2>
          <Input
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Input
            placeholder="해시태그 (쉼표로 구분)"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
          <SubmitButton type="submit">등록</SubmitButton>
        </PostForm>
      )}

      <FilterContainer>
        <FilterInput
          type="text"
          placeholder="제목 또는 #해시태그로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {currentUser && (
          <FilterButtons>
            <FilterButton
              active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
            >
              전체 피드
            </FilterButton>
            <FilterButton
              active={activeFilter === "myFeed"}
              onClick={() => setActiveFilter("myFeed")}
            >
              나의 피드
            </FilterButton>
          </FilterButtons>
        )}
      </FilterContainer>

      <PostList>
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p>게시물이 없습니다.</p>
        )}
      </PostList>

      {totalPages > 1 && (
        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PageButton
              key={page}
              active={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PageButton>
          ))}
        </Pagination>
      )}
    </Container>
  );
};

export default MainPage;

const Container = styled.div``;
const PostForm = styled.form`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
`;
const Textarea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
`;
const SubmitButton = styled.button`
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 4px;
  font-weight: 500;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;
const FilterInput = styled(Input)`
  width: 300px;
`;
const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.light};
  color: ${({ active, theme }) =>
    active ? theme.colors.white : theme.colors.dark};
  border: 1px solid
    ${({ active, theme }) =>
      active ? theme.colors.primary : theme.colors.border};
`;
const PostList = styled.div`
  /* ... */
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;
const PageButton = styled.button<{ active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.colors.white : theme.colors.dark};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;
