'use client';

import { useMemo } from 'react';

interface MarkdownRendererProps {
  content: string;
}

/**
 * 간단한 마크다운 렌더러
 * 향후 react-markdown 등으로 교체 가능
 */
export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = useMemo(() => {
    let result = content;

    // 이미지: ![alt](url)
    result = result.replace(
      /!\[(.*?)\]\((.*?)\)/g,
      '<img src="$2" alt="$1" class="max-w-full h-auto my-4" />'
    );

    // 링크: [text](url)
    result = result.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-primary underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // 헤딩
    result = result.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
    result = result.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>');
    result = result.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>');

    // 볼드, 이탤릭
    result = result.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // 코드 블록
    result = result.replace(
      /```(.*?)\n([\s\S]*?)```/g,
      '<pre class="bg-border/20 p-4 rounded my-4 overflow-x-auto"><code>$2</code></pre>'
    );

    // 인라인 코드
    result = result.replace(/`(.+?)`/g, '<code class="bg-border/20 px-1.5 py-0.5 rounded text-sm">$1</code>');

    // 줄바꿈
    result = result.replace(/\n\n/g, '</p><p class="my-4">');
    result = result.replace(/\n/g, '<br />');

    return `<div class="prose max-w-none"><p class="my-4">${result}</p></div>`;
  }, [content]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
