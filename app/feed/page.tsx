import Link from "next/link";
import PostCard from "@/components/PostCard";

// 더미 데이터 (나중에 API 연동)
const mockPosts = [
  { id: 1, title: "첫 번째 글입니다", author: "익명123", createdAt: "01-06", views: 42, commentCount: 3, likeCount: 5 },
  { id: 2, title: "오늘 날씨가 좋네요", author: "하늘이", createdAt: "01-06", views: 128, commentCount: 12, likeCount: 23 },
  { id: 3, title: "이번 주 추천 맛집", author: "먹방러", createdAt: "01-05", views: 89, commentCount: 7, likeCount: 15 },
  { id: 4, title: "새해 목표 공유해요", author: "열정맨", createdAt: "01-05", views: 203, commentCount: 28, likeCount: 45 },
  { id: 5, title: "취미 추천 받습니다", author: "심심이", createdAt: "01-04", views: 67, commentCount: 5, likeCount: 8 },
];

export default function FeedPage() {
  return (
    <main className="container py-4">
      {/* 헤더 영역 */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-[16px] font-medium text-[var(--foreground)] m-0">
          자유게시판
        </h1>
        <Link
          href="/write"
          className="btn btn-primary"
        >
          글쓰기
        </Link>
      </div>

      {/* 검색 영역 */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          className="input flex-1"
          placeholder="검색어를 입력하세요"
        />
        <button type="button" className="btn btn-secondary">
          검색
        </button>
      </div>

      {/* 글 목록 테이블 */}
      <table className="post-table">
        <thead>
          <tr>
            <th className="text-center">번호</th>
            <th>제목</th>
            <th className="text-center">글쓴이</th>
            <th className="text-center">날짜</th>
            <th className="text-center">조회</th>
            <th className="text-center">지껄</th>
          </tr>
        </thead>
        <tbody>
          {mockPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              author={post.author}
              createdAt={post.createdAt}
              views={post.views}
              commentCount={post.commentCount}
              likeCount={post.likeCount}
            />
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 / 무한스크롤 영역 */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-1">
          <button type="button" className="btn btn-sm btn-secondary">&laquo;</button>
          <button type="button" className="btn btn-sm btn-primary">1</button>
          <button type="button" className="btn btn-sm btn-secondary">2</button>
          <button type="button" className="btn btn-sm btn-secondary">3</button>
          <button type="button" className="btn btn-sm btn-secondary">4</button>
          <button type="button" className="btn btn-sm btn-secondary">5</button>
          <button type="button" className="btn btn-sm btn-secondary">&raquo;</button>
        </div>
      </div>
    </main>
  );
}
