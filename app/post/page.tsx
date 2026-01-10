"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetPosts } from "@/hooks/post";
import PostCard from "@/components/PostCard";
import LoadingSpinner from "@/components/LoadingSpinner";

function FeedPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(searchQuery);

  const { data, isLoading, isError } = useGetPosts(currentPage, searchQuery);

  const posts = data?.data?.posts ?? [];
  const totalPages = data?.data?.total_pages ?? 1;

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (searchInput) {
      params.set("search", searchInput);
    }
    router.push(`/post?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    router.push(`/post?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          type="button"
          onClick={() => handlePageChange(i)}
          className={`btn btn-sm ${
            i === currentPage ? "btn-primary" : "btn-secondary"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <main className="container py-4">
      {/* 헤더 영역 */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-[16px] font-medium text-[var(--foreground)] m-0">
          자유게시판
        </h1>
        <Link href="/write" className="btn btn-primary">
          글쓰기
        </Link>
      </div>

      {/* 검색 영역 */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          className="input flex-1"
          placeholder="검색어를 입력하세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={handleSearch}
          className="btn btn-secondary"
        >
          검색
        </button>
      </div>

      {/* 로딩/에러 상태 */}
      {isLoading && <LoadingSpinner />}

      {isError && (
        <div className="text-center py-8 text-[var(--text-muted)]">
          게시글을 불러오는데 실패했습니다.
        </div>
      )}

      {/* 글 목록 테이블 */}
      {!isLoading && !isError && (
        <>
          {posts.length === 0 ? (
            <div className="text-center py-8 text-[var(--text-muted)]">
              {searchQuery
                ? "검색 결과가 없습니다."
                : "아직 작성된 게시글이 없습니다."}
            </div>
          ) : (
            <table className="post-table">
              <thead>
                <tr>
                  <th className="text-center">번호</th>
                  <th>제목</th>
                  <th className="text-center">글쓴이</th>
                  <th className="text-center">날짜</th>
                  <th className="text-center">조회</th>
                  <th className="text-center">따봉</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    author={post.author_nickname}
                    createdAt={post.created_at}
                    views={post.view_count}
                    commentCount={post.comment_count}
                    likeCount={post.like_count}
                  />
                ))}
              </tbody>
            </table>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="btn btn-sm btn-secondary disabled:opacity-50"
                >
                  &laquo;
                </button>

                {renderPageNumbers()}

                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="btn btn-sm btn-secondary disabled:opacity-50"
                >
                  &raquo;
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default function FeedPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <FeedPageContent />
    </Suspense>
  );
}
