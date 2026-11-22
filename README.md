# FACEBOOK MULTI-PAGE ADMIN

Next.js + Firebase Auth/Realtime Database + Meta Graph API + Vercel.

## Setup
1. `npm install`, copy `.env.example` to `.env.local` and configure all values.
2. Create Firebase Authentication Email/Password user, copy its UID to `ADMIN_UIDS`.
3. Set Firebase Realtime Database URL and service account JSON (one line).
4. Generate 32-byte encryption key: `openssl rand -hex 32` for `TOKEN_ENCRYPTION_KEY`.
5. Create Meta App; configure Facebook Login redirect URI `https://YOUR_DOMAIN/api/auth/facebook/callback`; request appropriate Page permissions. Configure App ID/Secret.
6. `npm run dev`; log in with Firebase; connect Facebook and grant access to managed Pages.
7. Deploy to Vercel, set the same environment variables, set `PUBLIC_URL` to production HTTPS URL, set `CRON_SECRET`.
8. Vercel cron configured every five minutes (check your plan's cron limits); you can manually click `Xử lý tác vụ ngay` for immediate processing.

## Features
- Firebase email/password ADMIN login, UID allowlist server enforcement.
- Facebook OAuth CSRF state check, page discovery, encrypted Page tokens at rest.
- Campaigns for text, image URL and video Reels URL, select up to 6 connected Pages.
- Queue, scheduling, individual per-Page results, manual retry, cron worker.

## Important limitations / production hardening
- **Not connected by default.** Meta permissions/app review and Page tasks must be valid. Check current Meta Graph API version and upload specifications before production use.
- Media input is a publicly reachable HTTPS URL, **not a local file upload**. Add Firebase Storage signed-upload workflow for file uploads.
- Reels upload uses Meta's upload URL and `file_url` transfer; API behavior and headers must be verified against current Meta docs for your app/version.
- Worker is intentionally minimal. In production, add lease expiration/reconciliation for interrupted `processing` jobs, duplicate detection via Meta post lookups before retries, per-Page throttling, dead-letter queue, token refresh/reconnection, job status polling, audit logs, and robust timezone handling.
- `failed` retries may duplicate a Meta post if Meta published successfully but the response was lost. Verify remote post existence before retrying ambiguous failures.
- Vercel function duration limits may make multi-Reels processing too slow; use durable external queue/worker for production video processing.
- OAuth callback binds state to browser cookie, but does not bind to a Firebase admin session. For production, use a short-lived server-side state record tied to the admin UID and verify it at callback.
- This app does not implement real Insights metrics or upload media to Storage yet.
- Ensure legal compliance and Meta policies, particularly for gambling-related content.
