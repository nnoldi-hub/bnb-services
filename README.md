# 🏢 BNB Services - Property Management Platform

> **Platformă completă pentru gestionarea serviciilor de curățenie, întreținere și intervenții pentru apartamente de închiriat (Airbnb, Booking.com, etc.)**

---

## 📚 Documentație

Această documentație este organizată în mai multe fișiere pentru a fi ușor de navigat:

### **1. 📋 [Plan Original MVP](planMVP.md)**
Planul inițial cu overview-ul proiectului, tehnologii și etape de dezvoltare.

### **2. 🏗️ [Plan Dezvoltare Detaliat](PLAN_DEZVOLTARE_DETALIAT.md)** ⭐ **START HERE**
Plan comprehensiv cu:
- ✅ Principii arhitecturale (modularitate, scalabilitate, securitate)
- ✅ Stack tehnologic complet (NestJS, Next.js, React Native, Prisma)
- ✅ Structură monorepo detaliată
- ✅ Dezvoltare pe sprint-uri (MVP → V1.0 → Scalare)
- ✅ Database schema completă (Prisma)
- ✅ Best practices & standarde de cod
- ✅ Definition of Done & metrici de succes

### **3. 🚀 [Setup Guide](SETUP_GUIDE.md)** ⭐ **IMPLEMENTATION**
Ghid pas-cu-pas pentru setup tehnic:
- ✅ Configurare monorepo (Turborepo)
- ✅ Backend setup (NestJS + Prisma + PostgreSQL)
- ✅ Frontend Web setup (Next.js + shadcn/ui)
- ✅ Mobile App setup (React Native + Expo)
- ✅ CI/CD pipeline (GitHub Actions)
- ✅ Design system & shared packages
- ✅ Comenzi utile & troubleshooting

### **4. 📊 [Roadmap & Resurse](ROADMAP_RESURSE.md)**
Timeline vizual, echipă, buget și procese:
- ✅ Roadmap vizual (12 luni)
- ✅ Echipă recomandată (roluri, responsabilități, salarii)
- ✅ Buget detaliat (MVP: 30k-48k EUR)
- ✅ Alternative dezvoltare (in-house vs outsourcing vs hybrid)
- ✅ Metrici de succes per fază
- ✅ Scrum process & tools ecosystem
- ✅ Riscuri & mitigare

### **5. 🎬 [Plan Acțiune 30 Zile](ACTIUNE_30_ZILE.md)** ⭐ **ACTION PLAN**
Plan concret zi cu zi pentru primul lună:
- ✅ Tasks zilnice organizate (Ziua 1 → Ziua 30)
- ✅ Checklist-uri concrete
- ✅ Templates pentru daily standup & logging
- ✅ Sprint planning pentru primele 2 sprint-uri
- ✅ Success metrics & milestones
- ✅ What to do când lucrurile merg prost

---

## 🎯 Quick Start

### **Dacă ești la început:**
1. ✅ Citește [PLAN_DEZVOLTARE_DETALIAT.md](PLAN_DEZVOLTARE_DETALIAT.md) - înțelege arhitectura
2. ✅ Citește [ROADMAP_RESURSE.md](ROADMAP_RESURSE.md) - planifică echipa & bugetul
3. ✅ Citește [ACTIUNE_30_ZILE.md](ACTIUNE_30_ZILE.md) - începe execuția
4. ✅ Folosește [SETUP_GUIDE.md](SETUP_GUIDE.md) ca referință tehnică

### **Dacă ești developer și ești gata să codezi:**
1. ✅ Urmărește [ACTIUNE_30_ZILE.md](ACTIUNE_30_ZILE.md) - Ziua 1-7 (Setup)
2. ✅ Referințează [SETUP_GUIDE.md](SETUP_GUIDE.md) pentru comenzi exacte
3. ✅ Verifică [PLAN_DEZVOLTARE_DETALIAT.md](PLAN_DEZVOLTARE_DETALIAT.md) pentru structură & best practices

---

## 🏗️ Arhitectură High-Level

```
┌─────────────────────────────────────────────────────────────────┐
│                         APPLICATIONS                             │
├──────────────┬──────────────────┬──────────────┬────────────────┤
│  Web         │  Mobile App      │  Admin       │  Marketing     │
│  Dashboard   │  (React Native)  │  Panel       │  Site          │
│  (Next.js)   │                  │  (Next.js)   │  (Next.js)     │
└──────┬───────┴────────┬─────────┴──────┬───────┴────────┬───────┘
       │                │                │                │
       └────────────────┴────────────────┴────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   API Gateway     │
                    │   (NestJS)        │
                    └─────────┬─────────┘
                              │
       ┌──────────────────────┼──────────────────────┐
       │                      │                      │
┌──────▼──────┐     ┌────────▼────────┐     ┌──────▼──────┐
│  Auth       │     │  Business       │     │  External   │
│  Service    │     │  Logic          │     │  Services   │
│             │     │  (Tasks, Props) │     │  (Stripe,   │
│  (JWT)      │     │                 │     │   Airbnb)   │
└──────┬──────┘     └────────┬────────┘     └──────┬──────┘
       │                     │                     │
       └─────────────────────┼─────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  PostgreSQL     │
                    │  (Supabase)     │
                    └─────────────────┘
```

---

## 🛠️ Tech Stack

### **Backend**
- **Runtime:** Node.js 20+
- **Framework:** NestJS (TypeScript)
- **Database:** PostgreSQL (Supabase managed)
- **ORM:** Prisma
- **API:** REST + GraphQL
- **Auth:** JWT + Refresh Tokens
- **File Storage:** Supabase Storage (S3-compatible)
- **Queue:** BullMQ (Redis)

### **Frontend Web**
- **Framework:** Next.js 14+ (App Router)
- **UI:** shadcn/ui + Tailwind CSS
- **State:** Zustand + TanStack Query
- **Forms:** React Hook Form + Zod
- **Maps:** Mapbox GL
- **Charts:** Recharts

### **Mobile**
- **Framework:** React Native + Expo SDK 50+
- **Navigation:** React Navigation 6
- **UI:** React Native Paper / NativeBase
- **State:** Redux Toolkit + RTK Query
- **Maps:** React Native Maps

### **DevOps**
- **Monorepo:** Turborepo
- **CI/CD:** GitHub Actions
- **Hosting:** Vercel (web) + Expo EAS (mobile)
- **Monitoring:** Sentry + PostHog
- **Testing:** Vitest + Playwright + Detox

---

## 📊 Features Overview

### **MVP (Luni 0-3)**
- ✅ Autentificare (JWT)
- ✅ Management utilizatori (Owner, Team, Admin)
- ✅ CRUD Proprietăți (cu GPS & photos)
- ✅ Task management (curățenie, intervenții, întreținere)
- ✅ Check-in/Check-out cu GPS
- ✅ Upload poze înainte/după
- ✅ Plăți Stripe (per task / subscription)
- ✅ Notificări push & email
- ✅ Dashboard web pentru proprietari
- ✅ App mobilă pentru echipe

### **V1.0 (Luni 4-6)**
- ✅ Integrare Airbnb & Booking.com
- ✅ Auto-programare curățenie după checkout
- ✅ Inventar consumabile
- ✅ Rapoarte & analytics
- ✅ Chat real-time (owner ↔ echipă)
- ✅ Optimizare rute pentru echipe
- ✅ Admin panel avansat
- ✅ SLA tracking

### **Scalare (Luni 7-12)**
- ✅ Marketplace furnizori externi
- ✅ AI predictions (consumabile, optimizare)
- ✅ Multi-property management
- ✅ API public + webhooks
- ✅ White-label solution
- ✅ SSO support

---

## 💰 Buget Estimat

| Fază | Durată | Cost Echipă | Infrastructură | **Total** |
|------|--------|-------------|----------------|-----------|
| **MVP** | 3 luni | 28,500-46,500 EUR | 1,500 EUR | **30,000-48,000 EUR** |
| **V1.0** | 3 luni | 43,500-70,500 EUR | 3,000 EUR | **46,500-73,500 EUR** |
| **Scalare** | 6 luni | 150,000-240,000 EUR | 12,000 EUR | **162,000-252,000 EUR** |
| **TOTAL AN 1** | **12 luni** | **222,000-357,000 EUR** | **16,500 EUR** | **238,500-373,500 EUR** |

> **Recomandare:** Start cu opțiunea **Hybrid** (core in-house + freelancers) pentru cost optimizat: **~150k-220k EUR/an**

---

## 👥 Echipă Minimă (MVP)

1. **Full-Stack Developer Lead** - 40h/săpt - 3,000-5,000 EUR/lună
2. **Frontend Developer** - 40h/săpt - 2,500-4,000 EUR/lună
3. **Mobile Developer** - 40h/săpt - 2,500-4,000 EUR/lună
4. **UI/UX Designer** - 20h/săpt - 1,500-2,500 EUR/lună (part-time)

**Total:** 9,500-15,500 EUR/lună pentru 3 luni = **28,500-46,500 EUR**

---

## 📈 Success Metrics

### **MVP (Luna 3)**
- 5+ proprietari activi (beta)
- 50+ task-uri completate
- <500ms API response time
- 4.5+/5.0 user satisfaction
- <5% error rate

### **V1.0 (Luna 6)**
- 50+ proprietari plătitori
- 500+ task-uri/lună
- 90%+ completion rate
- $5,000+ MRR
- <2% churn

### **Scalare (Luna 12)**
- 500+ proprietari
- 10,000+ task-uri/lună
- $50,000+ MRR
- <1% churn
- NPS >50

---

## 🗓️ Timeline Sumar

```
Lună 0 ────── Lună 1 ────── Lună 2 ────── Lună 3 ────── Lună 6 ────── Lună 12
  │              │              │              │              │              │
Setup        Sprint 1-2     Sprint 3-4     Sprint 5      V1.0        Scalare
  │         (Auth+Props)   (Tasks+Pay)    (Testing)    Features    (AI+Market)
  │              │              │              │              │              │
  └──MVP START──┴──────────────┴──MVP BETA────┴─MVP LAUNCH──┴──V1.0 LAUNCH─┘
```

---

## 📞 Support & Resources

### **Documentation**
- **Architecture:** Vezi [PLAN_DEZVOLTARE_DETALIAT.md](PLAN_DEZVOLTARE_DETALIAT.md)
- **Setup:** Vezi [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Roadmap:** Vezi [ROADMAP_RESURSE.md](ROADMAP_RESURSE.md)
- **Action Plan:** Vezi [ACTIUNE_30_ZILE.md](ACTIUNE_30_ZILE.md)

### **Technologies**
- [NestJS Docs](https://docs.nestjs.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Expo Docs](https://docs.expo.dev)
- [Prisma Docs](https://www.prisma.io/docs)
- [shadcn/ui](https://ui.shadcn.com)

### **Community**
- NestJS Discord: [discord.gg/nestjs](https://discord.gg/nestjs)
- Next.js Discord: [nextjs.org/discord](https://nextjs.org/discord)
- React Native: [reactnative.dev/community](https://reactnative.dev/community/overview)

---

## 📝 Development Setup (Quick Start)

### **Prerequisites Installed:**
- ✅ Node.js v22.15.0
- ✅ npm 11.5.2
- ✅ Docker Desktop 29.2.1
- ✅ Git 2.49.0

### **Completed Setup:**
1. ✅ Monorepo structure created with Turborepo
2. ✅ Docker Compose configured (PostgreSQL + Redis + pgAdmin)
3. ✅ Docker containers running
4. ✅ Shared types package initialized
5. ⏳ Backend initialization (next step)

### **Servicii Docker Active:**
- 🐘 PostgreSQL: `localhost:5432` (user: postgres, pass: postgres, db: bnb_dev)
- 🔴 Redis: `localhost:6379`
- 🔧 pgAdmin: `http://localhost:5050` (email: admin@bnb.local, pass: admin)

### **Comenzi Utile:**
```bash
# Start Docker services
docker-compose up -d

# Stop Docker services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up -d --build

# Install dependencies in all packages
npm install

# Run all apps in development
npm run dev
```

### **Next Steps:**
1. ⏳ Initialize backend (NestJS + Prisma)
2. ⏳ Initialize frontend (Next.js + shadcn)
3. ⏳ Initialize mobile (Expo)
4. ⏳ CI/CD pipeline (GitHub Actions)

### **Săptămâna 2:**
1. ✅ Sprint 1: Auth & Users (backend + web + mobile)
2. ✅ Daily standups (09:30 AM, 15 min)
3. ✅ Code reviews pentru toate PR-urile

### **Luna 1:**
- Sprint 1: Auth & Users ✓
- Sprint 2: Properties
- Velocitate stabilită, ritm constant

---

## 🎯 Project Goals

### **Short-term (3 luni - MVP)**
Lansează un produs funcțional care:
- Rezolvă problema de coordonare curățenie/intervenții
- Reduce timpul de management cu 50%
- Are 5+ proprietari plătitori
- Net Promoter Score >40

### **Mid-term (6 luni - V1.0)**
Transformă produsul într-o platformă:
- Auto-sync cu Airbnb/Booking
- 50+ proprietari activi
- $5k+ MRR
- Expand în 2+ orașe

### **Long-term (12 luni - Scale)**
Construiește un marketplace:
- 500+ proprietari
- 50+ furnizori externi
- $50k+ MRR
- Series A ready

---

## 📜 License

Copyright © 2026 BNB Services. All rights reserved.

---

## 🙏 Acknowledgments

Acest proiect folosește următoarele tehnologii open-source extraordinare:
- NestJS, Next.js, React Native, Prisma, Tailwind CSS, shadcn/ui
- PostgreSQL, Redis, Expo
- și multe altele...

---

**Versiune:** 1.0.0  
**Ultima actualizare:** Martie 2026  
**Status:** 🚀 Ready for development

---

**Succes la construirea aplicației! 💪**

*"The best time to plant a tree was 20 years ago. The second best time is now."*
