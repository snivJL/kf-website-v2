# Korefocus Website

This project contains the front‑end for the **Korefocus** website. It is built with [Next.js](https://nextjs.org/) 15, React 19 and TypeScript.

## Requirements

- Node.js 18 or newer
- `pnpm` (or `npm`) for installing dependencies

## Setup

1. Install the dependencies:

   ```bash
   pnpm install
   ```

2. Create a `.env.local` file by copying the provided example and filling in your values:

   ```bash
   cp .env.example .env.local
   ```

   The following variables must be provided:

   - `NEXT_PUBLIC_BASE_URL` – base URL of the site (e.g. `http://localhost:3000`).
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` – Sanity CMS project ID.
   - `NEXT_PUBLIC_SANITY_DATASET` – Sanity dataset name.
   - `RESEND_API_KEY` – API key used to send emails with Resend.

3. Start the development server:

   ```bash
   pnpm dev
   ```

   The site will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `pnpm dev` – run the development server.
- `pnpm build` – create a production build.
- `pnpm start` – start the production server (after building).
- `pnpm lint` – run ESLint.
- `pnpm format` – format the codebase using Prettier.
- `pnpm test` – execute unit tests with Vitest.

## Testing

To execute the unit tests run:

```bash
pnpm test
```

The tests are located in the `test/` directory and use [Vitest](https://vitest.dev/).

## Project Structure

- `app/` – application routes and pages.
- `components/` – React components used throughout the site.
- `lib/` – utility functions and Sanity helpers.
- `public/` – static assets.
- `test/` – unit tests.

Feel free to open issues or submit pull requests to improve the project.
