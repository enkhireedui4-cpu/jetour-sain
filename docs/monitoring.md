# Jetour Mongolia — Monitoring & Alerting (single VPS)

**Phase 7A.** Lightweight monitoring for a **single VPS + Docker** deployment.
Design principle: **minimum moving parts.** No Prometheus/Grafana/ELK stack — that is
over-engineering for one node. We reuse the **existing Telegram bot** (already used for
lead notifications) as the alert channel, add one external uptime monitor, and lean on
Docker-native health checks plus two tiny host cron scripts.

---

## 1. The health probe

A dedicated endpoint backs every check: **`GET /api/health`** (see `src/app/api/health/route.ts`).

| Response | Meaning |
|---|---|
| `200 { status:"ok", db:"up", uptimeSec, latencyMs, ts }` | App process up **and** database reachable |
| `503 { status:"error", db:"down", ts }` | App up but **DB unreachable** |
| connection refused / timeout | App/container/VPS down |

It is `no-store` and never cached, returns no sensitive data, and its `SELECT 1` works on
both SQLite (dev) and PostgreSQL (prod).

## 2. What to watch

| # | Signal | How | Threshold → Action |
|---|---|---|---|
| 1 | **External uptime** | External monitor hitting `https://<domain>/api/health`, expect `200` + body keyword `ok` | 2 consecutive fails (≈2–5 min) → Telegram/email alert |
| 2 | **Container health** | Docker `HEALTHCHECK` on `/api/health` + `restart: unless-stopped` | Unhealthy/restart loop → alert |
| 3 | **Disk usage** | host cron (`df`) — DB volume, `public/`, Docker layers | ≥80% warn, ≥90% urgent → alert + prune |
| 4 | **Memory / swap** | host cron (`free`) | avail <10% or heavy swap → alert |
| 5 | **5xx / error rate** | container stdout + `server.log` | sustained 5xx or unhandled rejection → alert |
| 6 | **DB size / growth** | cron on SQLite file size or `pg` DB size | abnormal growth → investigate |
| 7 | **Backup freshness** | newest dump age (see [backup-recovery](./backup-recovery.md), Phase 7B) | >26h old → alert |
| 8 | **TLS cert expiry** | Caddy auto-renews; external monitor also flags | <14 days → alert |
| 9 | **Security signals** | `/api/lead` 429 rate-limit hits, failed admin logins | spike → review |

**Disk is the #1 silent killer on a VPS** (Docker images, logs, DB growth). Prioritize #3.

## 3. Alerting — reuse the Telegram bot (zero new infra)

The app already sends to Telegram via `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID`. Reuse the
same bot for ops alerts (optionally a separate "ops" chat id: `OPS_TELEGRAM_CHAT_ID`).

**Host cron alert script** — `/opt/jetour/monitor.sh` (NOT committed; contains no secrets if
env-sourced). Runs every 5 min:

```bash
#!/usr/bin/env bash
set -euo pipefail
source /opt/jetour/monitor.env      # TG_TOKEN, TG_CHAT, HEALTH_URL, DISK_PATH
notify(){ curl -fsS "https://api.telegram.org/bot${TG_TOKEN}/sendMessage" \
  -d chat_id="${TG_CHAT}" -d text="🚨 JETOUR VPS: $1" >/dev/null || true; }

# 1) health probe (app + DB)
code=$(curl -fsS -o /dev/null -w '%{http_code}' --max-time 10 "$HEALTH_URL" || echo 000)
[ "$code" = "200" ] || notify "health check failed (HTTP ${code})"

# 2) disk
use=$(df --output=pcent "$DISK_PATH" | tail -1 | tr -dc '0-9')
[ "$use" -ge 90 ] && notify "disk ${use}% on ${DISK_PATH} (URGENT)"
[ "$use" -ge 80 ] && [ "$use" -lt 90 ] && notify "disk ${use}% on ${DISK_PATH} (warn)"

# 3) memory (% available)
avail=$(free | awk '/Mem:/{printf "%d", $7/$2*100}')
[ "$avail" -lt 10 ] && notify "memory low: ${avail}% available"
```

```cron
*/5 * * * * /opt/jetour/monitor.sh
```

External uptime monitor (UptimeRobot / Healthchecks.io / BetterStack — **provider-agnostic**,
any works) is the second, independent layer: it runs *off* the VPS, so it catches
full-VPS/network outages the on-box cron cannot. Configure: `GET /api/health`, 1–5 min
interval, alert after 2 fails, notify Telegram/email.

## 4. Docker & logs

- **Healthcheck** (add to the production Dockerfile/compose when finalized):
  ```dockerfile
  HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
  ```
- **Restart policy:** `restart: unless-stopped`.
- **Log rotation** — cap container logs in compose so disk cannot fill:
  ```yaml
  logging: { driver: json-file, options: { max-size: "10m", max-file: "5" } }
  ```
  If running via the `start` script's `server.log`, add logrotate:
  ```
  /opt/jetour/server.log { weekly rotate 8 compress missingok notifempty copytruncate }
  ```

## 5. Tooling matrix

| Layer | Now (lightweight) | Future (only if scale demands) |
|---|---|---|
| Uptime | External monitor + on-box cron → Telegram | Multi-region checks |
| Errors | Container logs + `server.log`, 5xx watch | Sentry (self-host or free tier) |
| Metrics | `docker stats`, `df`, `free` via cron | Prometheus + node_exporter + Grafana |
| Tracing | (none — single node) | OpenTelemetry |

Keep the "Now" column unless traffic/complexity genuinely outgrows one VPS.

## 6. Setup checklist

- [ ] Deploy exposes `/api/health` (verify `curl -sf https://<domain>/api/health` → `200 ok`)
- [ ] External uptime monitor configured → alerts to Telegram/email
- [ ] `/opt/jetour/monitor.sh` + `monitor.env` installed, cron every 5 min, test-fired once
- [ ] Docker `HEALTHCHECK` + `restart: unless-stopped` in compose
- [ ] Container log rotation (`max-size`/`max-file`) or logrotate for `server.log`
- [ ] Optional `OPS_TELEGRAM_CHAT_ID` for a dedicated ops channel
- [ ] Backup-freshness alert wired (cross-ref Phase 7B)
