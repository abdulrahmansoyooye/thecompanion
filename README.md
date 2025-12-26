
# 📘 SubTrack: Subscription Management for Startups & Freelancers

## Overview

**SubTrack** is a modern SaaS tool built to help freelancers, startups, and small businesses manage their recurring subscriptions efficiently. From tracking billing cycles to forecasting budgets, SubTrack delivers smart analytics and clean UX to help you stay on top of your finances.

This documentation is maintained in a Turborepo structure using a dedicated Next.js `docs` app.

---

## 🔧 Project Structure

```
subtrack/
├── apps/
│   ├── web/                  # Next.js frontend app
│   ├── gateway/              # API gateway (aggregator for microservices)
│   ├── docs/                 # Internal documentation site (Next.js)
│   ├── services/             # All backend microservices
│   │   ├── auth/             # Auth service (JWT, OAuth, sessions)
│   │   ├── subscriptions/    # Core logic: add/edit/delete subs
│   │   ├── billing/          # Stripe sync logic
│   │   ├── users/            # Profile, onboarding, roles
│   │   └── notifications/    # Reminders, emails
│
├── packages/
│   ├── ui/                   # Shared components (shadcn, tailwind)
│   ├── lib/                  # Utilities, hooks, formatting helpers
│   ├── config/               # Global constants, env handling
│   ├── types/                # Global TS types
│   └── prisma/               # Shared DB schema and client setup
│
├── .github/                  # GitHub Actions, workflows
├── .env                      # Root env for local dev
├── turbo.json                # Turborepo pipeline config
├── package.json              # Monorepo-level scripts + dependencies
└── README.md                 # Main project overview



```

---

## 📌 MVP Scope

### Core Features

1. **User Authentication**
   - Email + Google Sign In
   - Roles: Freelancer, Startup, Business

2. **Subscription Management**
   - Manual & Integrated entries
   - Custom tags, categories, billing cycles

3. **Smart Dashboard**
   - Spend insights
   - Billing reminders
   - Usage analytics

4. **Budgeting & Forecasting**
   - Monthly limits
   - Burn rate prediction

5. **Analytics & Reports**
   - Visual insights
   - Exportable data

6. **Stripe Integration**
   - Auto-fetch subscriptions

7. **Admin Settings**
   - Timezone, currency
   - API keys management

---

## 💡 Tech Stack

| Layer        | Stack                            |
|--------------|----------------------------------|
| Frontend     | Next.js, TailwindCSS, SWR        |
| Backend      | Node.js, Express, tRPC (optional)|
| Auth         | Clerk/Auth.js / Custom JWT       |
| DB           | PostgreSQL + Prisma              |
| DevOps       | Docker, Turborepo, Vercel        |
| Docs         | Next.js (in `/apps/docs`)        |

---

## 🛠 Development Guide

### Prerequisites

- Node.js (v18+)
- pnpm
- Docker
- PostgreSQL
- Stripe account (test keys)

### Setup

```bash
pnpm install
pnpm dev
```

Set up `.env` files across:
- apps/frontend/.env
- apps/gateway/.env
- packages/auth/.env
- and so on...

---

## 🧭 Roadmap

> Tracked in `docs/roadmap.md` and GitHub Projects

### Phase 1 (Week 1–4)
- [ ] Project setup & planning
- [ ] Auth + user role logic
- [ ] Subscriptions module
- [ ] Dashboard UI
- [ ] Stripe test integration

### Phase 2 (Week 5–8)
- [ ] Forecasting engine
- [ ] Analytics module
- [ ] Polish & UX
- [ ] Prepare for launch

---

## 📁 Docs Directory (Next.js App)

Each section of the documentation is a separate route/page:
- `/intro` – Introduction
- `/setup` – Environment setup
- `/architecture` – System design
- `/roadmap` – Project milestones
- `/api` – API contracts (OpenAPI/TRPC)
- `/dev-notes` – Contributions & changelog

---

## 👨‍💻 Contribution Guide

- Follow Turborepo structure
- Lint: `pnpm lint`
- Format: `pnpm format`
- Each feature lives in a dedicated branch
- PRs must have attached issue or task

---

## 📬 Contact

abdulrahmansoyooye.vercel.app/contact
