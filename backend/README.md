# MeetEase Backend API

Flask REST API for **MeetEase** — an AI-powered meeting transcription and note generator.

Transcribes meeting recordings (AssemblyAI), cleans/translates/summarizes the text (DeepSeek), stores everything in SQLite, exports to PDF/Word, and emails the notes. Includes JWT auth and an in-app AI chatbot.

---

## Tech Stack

- **Flask 3** + Flask-SQLAlchemy, Flask-JWT-Extended, Flask-Cors
- **SQLite** database
- **AssemblyAI** — speech-to-text
- **DeepSeek** (OpenAI-compatible SDK) — translation, optimization, summarization, chatbot
- **python-docx / reportlab** — Word & PDF export
- **gunicorn** — production WSGI server

## Getting Started

> Requires **Python 3.12** and API keys.

```bash
# 1. Virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

# 2. Dependencies
pip install -r requirements.txt

# 3. Environment variables
copy .env.example .env        # Windows
cp .env.example .env          # macOS / Linux
# ...then fill in your API keys (see below)

# 4. Run (development, auto-reload)
python app.py
```

The API listens on `http://localhost:5000`. The database and `uploads/` / `outputs/` folders are created automatically on startup.

## Production Server

```bash
gunicorn app:app --bind 0.0.0.0:8000 --workers 1 --threads 8 --timeout 600
```

`--timeout 600` matters: AI processing and exports can take a long time.

## Environment Variables

All configuration comes from the environment (`.env` file via `python-dotenv`). See `.env.example`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `DEEPSEEK_API_KEY` | Yes | DeepSeek LLM (translation, optimization, summary, chatbot). App refuses to start without it. |
| `ASSEMBLYAI_API_KEY` | Yes | Speech-to-text transcription |
| `JWT_SECRET_KEY` | Yes | Signs JWTs. Generate: `python -c "import secrets; print(secrets.token_hex(32))"` |
| `SMTP_USERNAME` | No | Gmail address used to send meeting notes |
| `SMTP_PASSWORD` | No | Gmail **App Password** (https://myaccount.google.com/apppasswords) |
| `CORS_ORIGINS` | No | Comma-separated allowed frontend origins. Default: `http://localhost:3000,http://localhost:3001` |

> **Live deploy:** set `CORS_ORIGINS` to `http://localhost:3000,http://localhost:3001,https://meeteasefrontend-jet.vercel.app` in the Render dashboard Environment, then Redeploy. The backend silently omits `Access-Control-Allow-Origin` for origins not in this list, so browsers will block the frontend until it's added.

## API Endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | No | Register a user, returns JWT |
| `POST` | `/api/auth/login` | No | Login, returns JWT |
| `POST` | `/api/auth/refresh` | Yes | Refresh access token |
| `GET` | `/api/auth/validate` | Yes | Validate token / get profile |
| `POST` | `/api/upload` | Yes | Upload audio/video file (max 100 MB) |
| `POST` | `/api/process/<id>` | Yes | Kick off AI processing in background thread |
| `GET` | `/api/processing-status/<id>` | Yes | Poll processing progress (steps + %) |
| `GET` | `/api/meetings` | Yes | List current user's meetings |
| `GET` | `/api/meetings/<id>` | Yes | Meeting details (transcription + notes) |
| `DELETE` | `/api/meetings/<id>` | Yes | Delete a meeting |
| `POST` | `/api/translate` | Yes | Translate meeting text |
| `GET` | `/api/export/<id>/pdf\|word` | Yes | Download notes as PDF or Word |
| `POST` | `/api/send-email` | Yes | Email meeting notes |
| `POST` | `/api/chat` | No | Chatbot (DeepSeek) |
| `GET` | `/api/stats` | Yes | Dashboard statistics |
| `GET` | `/` | No | Health check |

Authenticated routes expect header `Authorization: Bearer <token>`.

## Deployment

Free hosting via **Render** is documented in the frontend repo's `DEPLOYMENT.md`; `render.yaml` (in this folder) contains the Render blueprint. Live API calls are driven by `CORS_ORIGINS` and the frontend's `NEXT_PUBLIC_API_URL`.

## Security Notes

- **Never commit `.env`** — it holds live API keys. It is git-ignored; only `.env.example` is tracked.
- SQLite + uploaded files live on local disk — redeploys/restarts on free hosts reset them. Demo only, not production.
- CORS is origin-restricted; keep JWT algorithms as-is unless you know what you are doing.