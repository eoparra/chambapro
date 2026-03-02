# ChambraPro

A directory platform for discovering and contacting local service professionals in Mexico. Built with Next.js 15, Prisma, and NextAuth v5.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Auth**: NextAuth v5 (credentials + Google OAuth)
- **Database**: PostgreSQL via Prisma ORM
- **Image uploads**: Cloudinary
- **Styling**: Tailwind CSS

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in the values in `.env.local`:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon, Supabase, or local) |
| `AUTH_SECRET` | Random secret — run `openssl rand -base64 32` |
| `AUTH_URL` | App URL (`http://localhost:3000` for local dev) |
| `AUTH_GOOGLE_ID` | Google OAuth client ID (optional) |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret (optional) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset |

### 3. Set up the database

```bash
npm run db:push     # push schema to database
npm run db:seed     # seed initial data (optional)
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to DB |
| `npm run db:seed` | Seed the database |
| `npm run db:studio` | Open Prisma Studio |

## Deployment

Deploy to [Vercel](https://vercel.com) with zero config. Make sure to set all environment variables in your project settings.

For the database, [Neon](https://neon.tech) (free tier) is recommended.
