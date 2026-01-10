import Link from "next/link";

interface PostCardProps {
  id: number;
  title: string | null;
  author: string;
  createdAt: string;
  views: number;
  commentCount: number;
  likeCount: number;
}

export default function PostCard({
  id,
  title,
  author,
  createdAt,
  views,
  commentCount,
  likeCount,
}: PostCardProps) {
  return (
    <tr className="hover:bg-[#fafafa] cursor-pointer">
      <td className="w-[60px] text-center text-[var(--text-light)] text-[12px]">
        {id}
      </td>
      <td>
        <Link
          href={`/post/${id}`}
          className="text-[13px] text-[var(--foreground)] hover:text-[var(--primary-dark)] hover:underline"
        >
          {title || "(제목 없음)"}
          {commentCount > 0 && (
            <span className="ml-1 text-[var(--primary-dark)] text-[11px]">
              [{commentCount}]
            </span>
          )}
        </Link>
      </td>
      <td className="w-[80px] text-center text-[12px] text-[var(--text-muted)]">
        {author}
      </td>
      <td className="w-[70px] text-center text-[11px] text-[var(--text-light)]">
        {createdAt}
      </td>
      <td className="w-[50px] text-center text-[11px] text-[var(--text-light)]">
        {views}
      </td>
      <td className="w-[50px] text-center text-[11px] text-[var(--primary-dark)]">
        {likeCount}
      </td>
    </tr>
  );
}
