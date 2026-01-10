# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

왁자 (Wakja) is a Korean community platform ("왁자지껄" - bustling/lively chatter) built with Next.js 16 App Router, React 19, TanStack Query, and Tailwind CSS v4. The application supports posting, commenting, likes ("지껄/따봉"), user authentication, and content moderation through a feedback system.

## Common Commands

```bash
# Development
pnpm dev              # Start dev server on http://localhost:3000
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Package management - this project uses pnpm
```

## Architecture & Code Organization

### Directory Structure

```
wakja_fe/
├── app/                    # Next.js 16 App Router pages
│   ├── layout.tsx         # Root layout with QueryProvider & Header
│   ├── page.tsx           # Home page (landing)
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── write/             # Post creation/editing
│   ├── post/              # Post list page
│   └── post/[id]/         # Post detail page with comments
└── src/
    ├── components/        # Shared React components
    ├── features/          # Feature-based modules (see below)
    ├── hooks/             # React hooks organized by feature
    ├── lib/               # Core utilities
    │   ├── instance.ts    # Axios instance with interceptors
    │   └── QueryProvider.tsx
    ├── constants/         # App constants
    │   └── querykeys/     # TanStack Query keys by feature
    └── types/             # Global TypeScript types
```

### Features Architecture

The codebase follows a **feature-based architecture** where each domain is self-contained in `src/features/`:

- **auth** - User authentication (login, signup, session)
- **post** - Posts/articles (CRUD, likes/지껄, pagination)
- **comment** - Comments on posts
- **feedback** - User feedback/content reporting
- **upload** - File uploads

Each feature module contains:

- `api.ts` - API functions using axios instance (with JSDoc)
- `types.ts` - TypeScript interfaces for requests/responses
- `index.ts` - Barrel export

### Data Fetching Pattern

- **TanStack Query (React Query)** is used for all server state
- Query keys are centralized in `src/constants/querykeys/`
- Custom hooks in `src/hooks/` wrap query logic (e.g., `useGetPosts`)
- `QueryProvider` configured in `app/layout.tsx` with:
  - `retry: 1`
  - `refetchOnWindowFocus: false`
  - `staleTime: 30_000` (30 seconds)

### API Communication

- Axios instance configured in `src/lib/instance.ts`
- Base URL: `process.env.NEXT_PUBLIC_API_BASE_URL` (defaults to `http://localhost:3001`)
- `withCredentials: true` for cookie-based auth
- Response interceptor set up for error handling

### Styling Approach

- **Tailwind CSS v4** via PostCSS
- Custom CSS variables defined in `app/globals.css`:
  - `--primary`: #ffc800 (yellow/gold theme)
  - `--background`, `--foreground`, `--border`, etc.
- Custom utility classes: `.card`, `.btn`, `.input`, `.textarea`, `.post-table`
- "디시인사이드" (Korean forum) inspired UI aesthetic

### TypeScript Configuration

- Path alias `@/*` maps to `./src/*`
- Strict mode enabled
- JSX runtime: `react-jsx` (React 19)
- Module resolution: `bundler`

### JSDoc Standards

API functions in `src/features/*/api.ts` include comprehensive JSDoc comments with:

- `@description` - What the function does
- `@auth` - Authentication requirements
- `@param` - Parameter descriptions
- `@returns` - Return type descriptions

Example:

```typescript
/**
 * 게시글 상세 조회
 * @description 특정 ID의 게시글 상세 정보와 본인 확인(is_owner) 여부를 가져옵니다.
 * @param {number} id - 게시글 ID
 */
export const getPost = async (id: number): Promise<ApiResponse<PostDetail>> => {
  const res = await instance.get(`/api/posts/${id}`);
  return res.data;
};
```

## Important Notes

- **App Router**: This uses Next.js 16 App Router (not Pages Router)
- **Client Components**: Components using hooks/events need `"use client"` directive
- **Korean Language**: UI text, comments, and variable names often use Korean
- **Authentication**: Cookie-based (session) authentication via backend API
- **Environment Variables**: Store `NEXT_PUBLIC_API_BASE_URL` in `.env` (not committed)
