# MeetEase — AI-Powered Meeting Notes Generator

Next.js frontend for **MeetEase**: record or upload a meeting, get a clean, structured transcription with summaries, key points, and action items — then download as PDF/Word or email it.

This repo is the **frontend only**. It talks to the MeetEase Flask API (see the backend repo / `backend/` folder).

---

## Tech Stack

- **Next.js 14** (App Router) + **React 18**, TypeScript
- **Tailwind CSS** + **shadcn/ui** components, glassmorphism design
- **framer-motion** animations, **recharts** charts, **lucide-react** icons

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/about`, `/contact` | Info pages (with AI chatbot widget) |
| `/login`, `/signup` | Authentication |
| `/upload` | Upload a recording or record from the mic |
| `/processing/[id]` | Live AI processing progress |
| `/meeting-notes/[id]` | Notes, summary, translation, export, email |
| `/dashboard` | Stats & recent meetings |
| `/history` | All past meetings |

A floating **MeetEase AI chatbot** is available on every page.

## Getting Started

> Requires **Node.js 18+**.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Pointing at a backend

The app reads the API base URL from the `NEXT_PUBLIC_API_URL` environment variable.

```bash
# local backend
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local

# or hosted backend
echo "NEXT_PUBLIC_API_URL=https://your-backend.onrender.com" > .env.local
```

If the variable is missing, it falls back to `http://localhost:5000`. Because it is compiled at **build time**, change it and restart/redeploy.

### Quick start (both servers)

Helper scripts assume the backend folder sits next to this one:

```bash
./install.sh   # sets up venv, deps, DB, .env files
./start.sh     # launches Flask (5000) + Next.js (3000)
```

## Production Build

```bash
npm run build
npm start      # or `next start` — serves at :3000
```

> Note: always delete `frontend/.next` before `npm run build` / `npm run dev` when things look stale (a known Next 14 Windows quirk in the "Collecting page data" phase).

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | No | Backend base URL. Default `http://localhost:5000`. Set at build time. |

## Deployment

**Vercel (free):** import this folder, set **Root Directory** to `frontend`, add `NEXT_PUBLIC_API_URL`, deploy.

Full step-by-step (Vercel + Render free tier) is in **[`DEPLOYMENT.md`](./DEPLOYMENT.md)**.

## Project Structure

```
frontend/
├── app/                  # App Router pages
│   ├── dashboard/        # Stats dashboard
│   ├── history/          # Meeting history
│   ├── login/ signup/    # Auth pages
│   ├── meeting-notes/[id]/
│   ├── processing/[id]/
│   ├── upload/
│   └── layout.tsx        # Root layout (TopBar + Chatbot)
├── components/           # navbar, footer, Chatbot, TopBar, ui/
├── lib/                  # config.ts (API URL), auth.ts
├── public/               # meeteaselogo.png, favicon
├── DEPLOYMENT.md         # Vercel + Render deploy guide
├── install.sh            # full-stack setup helper
└── start.sh              # full-stack launch helper
```

## Security Notes

- `.env.local` is git-ignored — never commit it (it may contain API URLs / secrets).
- Auth tokens are stored in `localStorage` and sent as `Authorization: Bearer`.
- Review `lib/config.ts` before adding any public secret — `NEXT_PUBLIC_*` vars ship to the browser, so never put real secrets in them.