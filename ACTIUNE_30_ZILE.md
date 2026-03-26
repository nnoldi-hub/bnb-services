# 🎬 Plan de Acțiune Imediată - Primii 30 de Zile

## 📅 Overview

Acest document oferă un plan **concret și acționabil** pentru următoarele 30 de zile, cu task-uri zilnice organizate pentru a te ajuta să pornești proiectul rapid și eficient.

---

## 🗓️ Săptămâna 1: Fundație & Setup (Zile 1-7)

### **Ziua 1: Decizie & Setup Inițial** ⚡

#### Morning (09:00 - 13:00)
- [ ] **09:00-10:00** - Review complet al tuturor documentelor de planificare
  - Citește `PLAN_DEZVOLTARE_DETALIAT.md`
  - Citește `SETUP_GUIDE.md`
  - Citește `ROADMAP_RESURSE.md`

- [ ] **10:00-11:00** - Decizie echipă
  - Alege între: In-house / Outsourcing / Hybrid
  - Identifică resursele disponibile
  - Stabilește bugetul pentru MVP (28k-46k EUR)

- [ ] **11:00-12:00** - Setup accounts & tools
  - [ ] Crează cont GitHub (dacă nu există)
  - [ ] Crează organizație GitHub "BNB-Services"
  - [ ] Crează cont Supabase (free tier)
  - [ ] Crează cont Stripe (test mode)
  - [ ] Crează cont Vercel
  - [ ] Crează cont Expo

- [ ] **12:00-13:00** - Project management setup
  - [ ] Înscrie-te la Linear (sau alternativă: Jira, Trello)
  - [ ] Creează primul project "BNB Services MVP"
  - [ ] Setup Notion workspace pentru documentație

#### Afternoon (14:00 - 18:00)
- [ ] **14:00-15:00** - Recrutare echipă (dacă încă nu ai)
  - Publică job posts pentru:
    - Full-Stack Developer Lead
    - Frontend Developer
    - Mobile Developer
    - UI/UX Designer (part-time)
  
- [ ] **15:00-16:00** - Domain & branding
  - [ ] Cumpără domeniu (ex: bnb-services.com)
  - [ ] Brainstorming nume aplicație (dacă nu e decis)
  - [ ] Creează mood board pentru branding

- [ ] **16:00-18:00** - Setup development environment
  - [ ] Instalează Node.js 20 LTS
  - [ ] Instalează VS Code + extensii
  - [ ] Instalează Docker Desktop
  - [ ] Instalează Git
  - [ ] Test setup: `node --version`, `npm --version`, `docker --version`

#### Evening (optional)
- [ ] **19:00-20:00** - Learning
  - Urmărește tutorial NestJS basics (dacă nu ești familiar)
  - Explorează shadcn/ui components

---

### **Ziua 2: Repository & Monorepo Setup** 🏗️

#### Morning
- [ ] **09:00-10:00** - GitHub repository setup
  ```bash
  # Create new repo on GitHub: "bnb-services"
  git clone git@github.com:your-org/bnb-services.git
  cd bnb-services
  ```

- [ ] **10:00-12:00** - Initialize Turborepo
  ```bash
  # Follow SETUP_GUIDE.md - Setup Monorepo section
  npm init -y
  npm install turbo --save-dev
  # Create turbo.json (copy from guide)
  # Setup package.json workspaces
  mkdir -p apps/{backend,web-dashboard,mobile-app}
  mkdir -p packages/{shared-types,ui-components,utils,api-client,config}
  ```

- [ ] **12:00-13:00** - Initial commit
  ```bash
  git add .
  git commit -m "chore: initialize monorepo with turborepo"
  git push origin main
  ```

#### Afternoon
- [ ] **14:00-16:00** - Setup ESLint, Prettier, Husky
  ```bash
  # Install dev dependencies
  npm install -D eslint prettier husky lint-staged
  npx husky-init
  # Configure .eslintrc.js, .prettierrc
  # Setup pre-commit hooks
  ```

- [ ] **16:00-18:00** - CI/CD pipeline (GitHub Actions)
  ```bash
  mkdir -p .github/workflows
  # Create ci.yml (copy from SETUP_GUIDE.md)
  git add .github/
  git commit -m "ci: add github actions workflow"
  git push
  ```

---

### **Ziua 3: Backend Foundation** ⚙️

#### Morning
- [ ] **09:00-11:00** - Initialize NestJS
  ```bash
  cd apps
  npx @nestjs/cli new backend
  cd backend
  npm install @nestjs/config @nestjs/jwt @nestjs/passport
  npm install @prisma/client bcrypt class-validator
  npm install -D prisma @types/bcrypt
  ```

- [ ] **11:00-13:00** - Setup Prisma & Docker
  ```bash
  npx prisma init
  # Copy docker-compose.yml from guide
  docker-compose up -d
  # Copy schema.prisma from SETUP_GUIDE.md
  npx prisma migrate dev --name init
  npx prisma generate
  ```

#### Afternoon
- [ ] **14:00-16:00** - Create base modules
  ```bash
  nest g module auth
  nest g module users
  nest g module properties
  nest g module tasks
  nest g service auth --no-spec
  nest g service users --no-spec
  nest g controller auth --no-spec
  nest g controller users --no-spec
  ```

- [ ] **16:00-18:00** - Environment & configuration
  ```bash
  # Copy .env.example from guide
  cp .env.example .env
  # Edit .env with your values
  # Test: npm run start:dev
  # Verify: http://localhost:3000 works
  ```

---

### **Ziua 4: Frontend Web Setup** 🌐

#### Morning
- [ ] **09:00-11:00** - Initialize Next.js
  ```bash
  cd apps
  npx create-next-app@latest web-dashboard \
    --typescript --tailwind --app --no-src-dir
  cd web-dashboard
  ```

- [ ] **11:00-13:00** - Install shadcn/ui
  ```bash
  npx shadcn-ui@latest init
  # Add essential components
  npx shadcn-ui@latest add button card input form dialog table
  ```

#### Afternoon
- [ ] **14:00-16:00** - Project structure
  ```bash
  cd app
  mkdir -p (auth)/{login,register}
  mkdir -p (dashboard)/{properties,tasks,settings}
  mkdir -p components/{ui,features,layouts}
  mkdir -p lib hooks stores
  ```

- [ ] **16:00-18:00** - API client & environment
  ```bash
  # Create lib/api-client.ts (copy from guide)
  # Create .env.local (copy from guide)
  # Test: npm run dev
  # Verify: http://localhost:3001 works
  ```

---

### **Ziua 5: Mobile App Setup** 📱

#### Morning
- [ ] **09:00-11:00** - Initialize Expo
  ```bash
  cd apps
  npx create-expo-app mobile-app --template blank-typescript
  cd mobile-app
  ```

- [ ] **11:00-13:00** - Install dependencies
  ```bash
  # Navigation
  npx expo install @react-navigation/native
  npx expo install react-native-screens react-native-safe-area-context
  
  # UI & State
  npm install react-native-paper @reduxjs/toolkit react-redux
  
  # Utils
  npx expo install expo-camera expo-location react-native-maps
  ```

#### Afternoon
- [ ] **14:00-16:00** - Project structure
  ```bash
  mkdir -p src/{screens,components,navigation,store,services,utils}
  mkdir -p src/screens/{auth,tasks,profile}
  # Configure app.json (copy from guide)
  ```

- [ ] **16:00-18:00** - Test mobile app
  ```bash
  npx expo start
  # Test on iOS simulator (Mac) sau Android emulator
  # Sau scan QR cu Expo Go pe telefon
  ```

---

### **Ziua 6: Design System & Shared Packages** 🎨

#### Morning
- [ ] **09:00-11:00** - Figma setup
  - [ ] Crează cont Figma (dacă nu există)
  - [ ] Creează project "BNB Services"
  - [ ] Import design system template (ex: shadcn/ui Figma kit)
  - [ ] Definește culori brand (primary, accent, neutrals)

- [ ] **11:00-13:00** - Create shared-types package
  ```bash
  cd packages/shared-types
  npm init -y
  # Create src/entities/, src/dtos/, src/enums/
  # Define User, Property, Task types
  ```

#### Afternoon
- [ ] **14:00-16:00** - Create ui-components package
  ```bash
  cd packages/ui-components
  npm init -y
  npm install react react-dom
  npm install -D typescript @types/react
  # Setup Storybook (optional pentru acum)
  ```

- [ ] **16:00-18:00** - Wireframes
  - [ ] Login/Register screens (web + mobile)
  - [ ] Dashboard overview (web)
  - [ ] Task list (mobile)
  - [ ] Property list (web)

---

### **Ziua 7: Review & Planning** 📊

#### Morning
- [ ] **09:00-11:00** - Code review & cleanup
  - [ ] Review tot codul scris până acum
  - [ ] Fix linting errors
  - [ ] Update README.md cu instrucțiuni setup
  - [ ] Test că toate app-urile pornesc (`npm run dev`)

- [ ] **11:00-13:00** - Documentation
  - [ ] Scrie CONTRIBUTING.md
  - [ ] Scrie CODE_OF_CONDUCT.md
  - [ ] Update package.json scripts
  - [ ] Tag version: `git tag v0.1.0`

#### Afternoon
- [ ] **14:00-16:00** - Sprint planning pentru Sprint 1
  - [ ] Review Sprint 1 tasks (Auth & Users)
  - [ ] Create tasks în Linear
  - [ ] Estimate story points
  - [ ] Assign tasks to team members

- [ ] **16:00-18:00** - Team kickoff meeting
  - [ ] Prezintă arhitectura echipei
  - [ ] Walkthrough setup guide
  - [ ] Q&A session
  - [ ] Stabilește daily standup time (09:30 AM)

#### Evening
- [ ] **Retrospectivă săptămână 1**
  - Ce a mers bine?
  - Ce a fost challenging?
  - Ce învățăm pentru săptămâna viitoare?

---

## 🗓️ Săptămâna 2: Sprint 1 Început - Auth & Users (Zile 8-14)

### **Ziua 8: Backend - Auth Setup** 🔐

#### Tasks
- [ ] **Authentication module NestJS**
  - [ ] JWT strategy implementation
  - [ ] Password hashing (bcrypt)
  - [ ] Login endpoint (`POST /auth/login`)
  - [ ] Register endpoint (`POST /auth/register`)
  - [ ] Refresh token endpoint (`POST /auth/refresh`)

#### Deliverables
- ✅ Auth module complet
- ✅ Unit tests pentru auth service
- ✅ Swagger documentation pentru auth endpoints

---

### **Ziua 9: Backend - Users CRUD** 👤

#### Tasks
- [ ] **Users module**
  - [ ] GET /users/me (current user profile)
  - [ ] PATCH /users/me (update profile)
  - [ ] GET /users/:id (admin only)
  - [ ] RBAC guards (Owner, Team, Admin)

#### Deliverables
- ✅ Users CRUD complete
- ✅ Role-based authorization working
- ✅ Unit tests

---

### **Ziua 10: Frontend Web - Auth UI** 🖥️

#### Tasks
- [ ] **Login page**
  - [ ] Form cu email/password
  - [ ] Validation (react-hook-form + Zod)
  - [ ] Error handling
  - [ ] Loading states

- [ ] **Register page**
  - [ ] Multi-step form (info personală → verificare email)
  - [ ] Password strength indicator

#### Deliverables
- ✅ Login/Register functional
- ✅ Token storage în localStorage
- ✅ Auto-redirect după login

---

### **Ziua 11: Frontend Web - Protected Routes** 🛡️

#### Tasks
- [ ] **Auth middleware**
  - [ ] Check token validity
  - [ ] Redirect to login dacă nu e autentificat
  - [ ] Refresh token logic

- [ ] **Dashboard layout**
  - [ ] Sidebar navigation
  - [ ] Header cu user profile
  - [ ] Logout functionality

#### Deliverables
- ✅ Protected routes working
- ✅ Dashboard layout complete

---

### **Ziua 12: Mobile - Auth Screens** 📱

#### Tasks
- [ ] **Login screen (mobile)**
  - [ ] Form validation
  - [ ] Biometric auth setup (optional pentru MVP)
  - [ ] Token storage în SecureStore

- [ ] **Register screen (mobile)**
  - [ ] Simple flow (nu multi-step pentru MVP)

#### Deliverables
- ✅ Mobile auth functional
- ✅ Navigation setup (Auth stack vs Main stack)

---

### **Ziua 13: Integration & Testing** 🧪

#### Tasks
- [ ] **Integration testing**
  - [ ] Test auth flow end-to-end (web)
  - [ ] Test auth flow end-to-end (mobile)
  - [ ] Fix bugs găsite

- [ ] **API documentation**
  - [ ] Complete Swagger docs pentru auth & users
  - [ ] Add examples în Swagger

#### Deliverables
- ✅ E2E tests passing
- ✅ No critical bugs

---

### **Ziua 14: Sprint Review & Retrospective** 📊

#### Morning
- [ ] **09:00-11:00** - Sprint Review
  - Demo auth features (web + mobile)
  - Stakeholder feedback
  - Accept/reject deliverables

#### Afternoon
- [ ] **14:00-16:00** - Sprint Retrospective
  - What went well?
  - What could be improved?
  - Action items pentru Sprint 2

- [ ] **16:00-18:00** - Sprint 2 Planning (Properties)
  - Review backlog
  - Create tasks
  - Estimate & assign

---

## 🗓️ Săptămâna 3-4: Sprint 2 - Properties (Zile 15-28)

### **Quick Overview (detalii în planul principal)**

#### Săptămâna 3
- **Ziua 15-16**: Backend Properties CRUD + Database schema
- **Ziua 17-18**: Frontend Properties List + Add Form
- **Ziua 19-20**: Photo upload + Mapbox integration
- **Ziua 21**: Sprint checkpoint & bug fixes

#### Săptămâna 4
- **Ziua 22-23**: Mobile Properties view
- **Ziua 24-25**: Property details page (web + mobile)
- **Ziua 26-27**: Testing & refinements
- **Ziua 28**: Sprint 2 Review & Retrospective

---

## 🗓️ Ziua 29-30: Milestone & Planning Viitor

### **Ziua 29: MVP Progress Review** 📈

#### Morning
- [ ] **09:00-11:00** - Progress assessment
  - ✅ Auth ✓
  - ✅ Users ✓
  - ✅ Properties (în curs)
  - ⏳ Tasks (next)
  - ⏳ Payments (next)

- [ ] **11:00-13:00** - Metrics review
  - Code quality metrics
  - Test coverage (target: >80%)
  - Performance benchmarks
  - Technical debt assessment

#### Afternoon
- [ ] **14:00-16:00** - Stakeholder update
  - Progress presentation
  - Demo current features
  - Feedback collection
  - Budget & timeline review

- [ ] **16:00-18:00** - Team health check
  - Velocity analysis
  - Workload balance
  - Morale check
  - Adjustments needed?

---

### **Ziua 30: Planning Luna 2** 🎯

#### Morning
- [ ] **09:00-11:00** - Backlog grooming
  - Review Sprint 3 tasks (Tasks Core)
  - Review Sprint 4 tasks (Payments)
  - Prioritize features
  - Identify dependencies

- [ ] **11:00-13:00** - Risk assessment
  - Technical risks
  - Timeline risks
  - Resource risks
  - Mitigation strategies

#### Afternoon
- [ ] **14:00-16:00** - Celebrează primele 30 de zile! 🎉
  - Team lunch/virtual hangout
  - Share learnings
  - Appreciate contributions
  - Motivate pentru next month

- [ ] **16:00-18:00** - Documentation update
  - Update README.md
  - Update ROADMAP.md cu progress
  - Document lessons learned
  - Share knowledge base articles

---

## ✅ Checklist Final - Primii 30 de Zile

### **Setup & Infrastructure**
- [ ] Monorepo functional
- [ ] Backend API running
- [ ] Frontend web running
- [ ] Mobile app running
- [ ] Database setup (PostgreSQL)
- [ ] CI/CD pipeline active
- [ ] All team members onboarded

### **Features Completate**
- [ ] Authentication (login/register)
- [ ] User management
- [ ] Properties CRUD (partial)
- [ ] Protected routes
- [ ] Basic UI/UX implemented

### **Code Quality**
- [ ] Test coverage >70%
- [ ] Linting passing
- [ ] No critical bugs
- [ ] Documentation updated
- [ ] Code reviews în place

### **Team & Process**
- [ ] Sprint rituals established (planning, standup, review, retro)
- [ ] Task tracking system în use (Linear/Jira)
- [ ] Communication flowing (Slack/Discord)
- [ ] Knowledge sharing happening

---

## 🎯 Success Metrics - Ziua 30

| Metric | Target | Actual |
|--------|--------|--------|
| Features completed | 40% MVP | ___ % |
| Test coverage | >70% | ___ % |
| Code quality score | A/B | ___ |
| Team velocity (story points) | 30-40/sprint | ___ |
| Bugs found vs fixed | <10 backlog | ___ |
| Team satisfaction | 4+/5 | ___ |

---

## 🚀 Next Steps După Ziua 30

### **Luna 2 (Zile 31-60):**
- Sprint 3: Task Management Core (✨ Critical pentru MVP)
- Sprint 4: Payments & Notifications
- Continuous testing & bug fixing

### **Luna 3 (Zile 61-90):**
- Sprint 5: Final testing & polish
- Beta testing cu 3-5 proprietari
- MVP Launch! 🎉

---

## 📞 Daily Standup Template

**Time:** 09:30 AM (15 min max)

**Format:**
```
👤 [Nume]
✅ Yesterday: [Ce am realizat]
🎯 Today: [Pe ce lucrez astăzi]
🚧 Blockers: [Ce mă blochează, dacă e cazul]
```

**Example:**
```
👤 Alex (Full-Stack Lead)
✅ Yesterday: Implemented JWT auth & refresh tokens
🎯 Today: Create Users CRUD endpoints + unit tests
🚧 Blockers: None
```

---

## 💡 Pro Tips pentru Primele 30 de Zile

### **1. Focus pe MVP Features**
- Nu te lăsa distras de "nice to have" features
- Stay laser-focused pe core functionality
- "Perfect is the enemy of good"

### **2. Communicate Overcommunicate**
- Daily standups non-negotiable
- Document decisions (Architecture Decision Records)
- Share blockers imediat, nu aștepta

### **3. Test Early, Test Often**
- Write tests în paralel cu features
- Don't accumulate testing debt
- Automated testing saves time long-term

### **4. Code Review Everything**
- No code merged without review
- Use PR templates
- Focus pe learning, nu criticism

### **5. Track Everything**
- Time tracking (pentru buget)
- Task completion (pentru velocity)
- Bug reports (pentru quality)
- User feedback (pentru product-market fit)

### **6. Celebrate Small Wins**
- First successful API call? Celebrate! 🎉
- First mobile build? Celebrate! 🎉
- First PR merged? Celebrate! 🎉
- Keep team morale high

---

## 🆘 Când Lucrurile Merg Prost

### **Scenario 1: Fallen behind schedule**
**Action:**
- Identify bottlenecks
- De-scope non-critical features
- Add resources dacă bugetul permite
- Communicate cu stakeholders ASAP

### **Scenario 2: Technical blockers**
**Action:**
- Research solutions (2h max)
- Ask for help (team, community, Stack Overflow)
- Consider alternative approaches
- Document decision & learnings

### **Scenario 3: Team conflicts**
**Action:**
- Address imediat, nu ignora
- 1-on-1 discussions
- Focus pe issue-uri, nu persoane
- Seek mediation dacă e necesar

### **Scenario 4: Scope creep**
**Action:**
- Say NO to new features în MVP
- Maintain strict backlog prioritization
- Remind stakeholders de MVP goals
- Schedule new ideas pentru V1.0

---

## 📚 Resources & Support

### **Technical Help**
- **NestJS Discord:** discord.gg/nestjs
- **Next.js Discord:** nextjs.org/discord
- **React Native Community:** reactnative.dev/community/overview
- **Stack Overflow:** Tag cu [nestjs], [nextjs], [react-native]

### **Project Management**
- **Scrum Guide:** scrumguides.org
- **Linear Academy:** linear.app/method
- **Agile Manifesto:** agilemanifesto.org

### **Design Inspiration**
- **Dribbble:** dribbble.com (property management apps)
- **Mobbin:** mobbin.com (mobile patterns)
- **Land-book:** land-book.com (landing pages)

---

## 📝 Daily Log Template

Ține un jurnal cu progresul zilnic:

```markdown
# Day X - [Date]

## ✅ Completed
- Task 1
- Task 2

## 🚧 In Progress
- Task 3 (80% done)

## ⏸️ Blocked
- Task 4 (waiting for API access)

## 💡 Learnings
- Learned about X
- Discovered Y pattern

## 📊 Metrics
- Hours worked: 8h
- Story points completed: 5
- Bugs fixed: 2

## 📅 Tomorrow
- Plan for Day X+1
```

---

**Succes în primele 30 de zile! 🚀**

*Remember: Progress > Perfection. Ship often, iterate fast, learn continuously.*

---

**Document version:** 1.0  
**Last updated:** Martie 2026  
**Status:** Ready for execution ✅
