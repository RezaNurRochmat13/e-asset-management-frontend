# eAsset Management Frontend

A web-based asset management system built with **Next.js**, **Tailwind CSS**, and **React Query**. This frontend provides a modern, responsive interface for managing organizational assets — including tracking, assignment, maintenance, and reporting.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Data Fetching & Caching**: [React Query](https://tanstack.com/query/latest) (TanStack Query)
- **Language**: TypeScript

## Project Structure

```
app/
├── landing/page.tsx        # Landing page
├── login/page.tsx          # Login page placeholder
├── shared/components/      # Shared/reusable components
│   ├── Button.tsx
│   ├── Container.tsx
│   ├── FeatureCard.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx
│   ├── Navbar.tsx
│   └── SectionHeader.tsx
├── globals.css
├── layout.tsx
└── page.tsx                # Redirects to /landing
```

## Pages

| Route       | Description         |
| ----------- | ------------------- |
| `/landing`  | Landing page        |
| `/login`    | Login page          |

## Getting Started

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `pnpm dev`        | Start the development server         |
| `pnpm build`      | Build the application for production |
| `pnpm start`      | Start the production server          |
| `pnpm lint`       | Run ESLint to check code quality     |
