# Consultie Admin Dashboard

An admin dashboard for managing consultation platform operations. The application is built with Next.js and provides tools for reviewing platform activity, managing users and bookings, and updating administrative settings.

## Features

- Dashboard metrics and analytics
- Account, booking, earnings, and transaction management
- Content moderation and reported-content review
- Category, subscription, and withdrawal management
- Authentication and account settings
- API data fetching and state management with Redux Toolkit Query

## Tech Stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 18
- [TypeScript](https://www.typescriptlang.org/)
- [Ant Design](https://ant.design/) and [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/) and RTK Query
- [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation

## Requirements

- Node.js (use an active LTS release)
- npm
- Access to the dashboard API

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create or update the root `.env` file and set the API base URL:

   ```env
   NEXT_PUBLIC_BASE_URL=https://your-api-host
   ```

   Replace the example URL with the API environment you intend to use. Do not commit credentials or other secrets to source control. Because this variable is prefixed with `NEXT_PUBLIC_`, its value is available to client-side code and must not contain secrets.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3008](http://localhost:3008).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 3008 with Turbopack. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Start the production server. Run `npm run build` first. |
| `npm run lint` | Run the configured Next.js lint command. |
| `npm run typecheck` | Check the TypeScript project without generating output. |

## Project Structure

```text
src/
├── app/          # App Router pages and route-specific components
├── components/   # Shared UI components
├── lib/          # Application-level providers
├── redux/        # Redux store, slices, and API services
├── schema/       # Form validation schemas
├── theme/        # UI theme configuration
└── utils/        # Shared utility functions
```

## Production Build

Build and start the application with:

```bash
npm run build
npm run start
```

The production server uses Next.js's default port unless configured otherwise. Make sure the API URL is configured for the target environment before building and deploying.
