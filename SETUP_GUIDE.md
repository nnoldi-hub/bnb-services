# 🚀 Ghid Implementare Practică - Faza 0

## 📋 Cuprins
1. [Prerequisite](#prerequisite)
2. [Setup Monorepo](#setup-monorepo)
3. [Configurare Backend](#backend-setup)
4. [Configurare Frontend Web](#frontend-web)
5. [Configurare Mobile App](#mobile-setup)
6. [CI/CD Pipeline](#cicd)
7. [Design System](#design-system)

---

## ✅ Prerequisite {#prerequisite}

### Software necesar:
```bash
# Node.js 20 LTS
node --version  # v20.x.x
npm --version   # 10.x.x

# Git
git --version   # 2.x.x

# Docker Desktop (pentru local development)
docker --version
docker-compose --version

# Editoare recomandate
# - VS Code cu extensii:
#   - ESLint
#   - Prettier
#   - Prisma
#   - Tailwind CSS IntelliSense
#   - GitLens
#   - Error Lens
```

### Conturi necesare:
- [ ] GitHub Account
- [ ] Supabase Account (free tier)
- [ ] Stripe Account (test mode)
- [ ] Expo Account (pentru mobile app)
- [ ] Vercel/Railway Account (deployment)

---

## 🏗 Setup Monorepo {#setup-monorepo}

### Pas 1: Creare structură de bază

```bash
# Creare director proiect
mkdir bnb-services
cd bnb-services

# Initialize Git
git init
git branch -M main

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output/

# Production
dist/
build/
.next/
.expo/

# Environment
.env
.env*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
logs/

# Misc
.turbo/
.cache/
EOF

# Initialize package.json
npm init -y
```

### Pas 2: Install Turborepo

```bash
npm install turbo --save-dev

# Create turbo.json
cat > turbo.json << 'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    }
  }
}
EOF
```

### Pas 3: Configurare workspaces

```json
// package.json
{
  "name": "bnb-services",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "clean": "turbo run clean && rm -rf node_modules"
  },
  "devDependencies": {
    "turbo": "^1.12.0",
    "prettier": "^3.2.5",
    "eslint": "^8.57.0"
  }
}
```

### Pas 4: Creare structură directoare

```bash
mkdir -p apps/backend
mkdir -p apps/web-dashboard
mkdir -p apps/mobile-app
mkdir -p apps/admin-panel
mkdir -p packages/shared-types
mkdir -p packages/ui-components
mkdir -p packages/utils
mkdir -p packages/api-client
mkdir -p packages/config
mkdir -p infrastructure/docker
mkdir -p infrastructure/terraform
mkdir -p docs
```

---

## ⚙️ Configurare Backend {#backend-setup}

### Pas 1: Initialize NestJS

```bash
cd apps
npx @nestjs/cli new backend
cd backend

# Install dependencies
npm install @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @prisma/client
npm install bcrypt class-validator class-transformer
npm install -D prisma @types/bcrypt @types/passport-jwt
```

### Pas 2: Setup Prisma

```bash
npx prisma init

# Editează .env
# DATABASE_URL="postgresql://postgres:password@localhost:5432/bnb_dev?schema=public"
```

**Fișier: `prisma/schema.prisma`**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  firstName     String    @map("first_name")
  lastName      String    @map("last_name")
  phone         String?
  role          Role      @default(OWNER)
  emailVerified Boolean   @default(false) @map("email_verified")
  isActive      Boolean   @default(true) @map("is_active")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  properties    Property[]
  assignedTasks Task[]     @relation("AssignedTasks")
  payments      Payment[]
  notifications Notification[]

  @@map("users")
}

enum Role {
  OWNER
  TEAM_MEMBER
  ADMIN
}

model Property {
  id          String   @id @default(uuid())
  ownerId     String   @map("owner_id")
  name        String
  address     String
  city        String
  country     String   @default("Romania")
  postalCode  String?  @map("postal_code")
  latitude    Float
  longitude   Float
  bedrooms    Int
  bathrooms   Int
  photos      String[]
  isActive    Boolean  @default(true) @map("is_active")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  owner       User     @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  tasks       Task[]
  inventory   InventoryItem[]

  @@index([ownerId])
  @@map("properties")
}

model Task {
  id                String     @id @default(uuid())
  propertyId        String     @map("property_id")
  assignedToId      String?    @map("assigned_to_id")
  type              TaskType
  status            TaskStatus @default(PENDING)
  title             String
  description       String?
  scheduledAt       DateTime?  @map("scheduled_at")
  startedAt         DateTime?  @map("started_at")
  completedAt       DateTime?  @map("completed_at")
  estimatedDuration Int?       @map("estimated_duration") // minutes
  priority          Priority   @default(MEDIUM)
  createdAt         DateTime   @default(now()) @map("created_at")
  updatedAt         DateTime   @updatedAt @map("updated_at")

  property          Property   @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  assignedTo        User?      @relation("AssignedTasks", fields: [assignedToId], references: [id], onDelete: SetNull)
  photos            TaskPhoto[]
  checkpoints       TaskCheckpoint[]

  @@index([propertyId])
  @@index([assignedToId])
  @@index([status])
  @@index([scheduledAt])
  @@map("tasks")
}

enum TaskType {
  CLEANING
  EMERGENCY
  MAINTENANCE
  INSPECTION
}

enum TaskStatus {
  PENDING
  ASSIGNED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

model TaskPhoto {
  id        String    @id @default(uuid())
  taskId    String    @map("task_id")
  url       String
  type      PhotoType
  createdAt DateTime  @default(now()) @map("created_at")

  task      Task      @relation(fields: [taskId], references: [id], onDelete: Cascade)

  @@index([taskId])
  @@map("task_photos")
}

enum PhotoType {
  BEFORE
  AFTER
  DURING
  ISSUE
}

model TaskCheckpoint {
  id          String   @id @default(uuid())
  taskId      String   @map("task_id")
  description String
  isCompleted Boolean  @default(false) @map("is_completed")
  order       Int
  createdAt   DateTime @default(now()) @map("created_at")

  task        Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)

  @@index([taskId])
  @@map("task_checkpoints")
}

model Payment {
  id              String        @id @default(uuid())
  userId          String        @map("user_id")
  amount          Decimal       @db.Decimal(10, 2)
  currency        String        @default("RON")
  type            PaymentType
  status          PaymentStatus
  stripePaymentId String?       @map("stripe_payment_id")
  description     String?
  metadata        Json?
  createdAt       DateTime      @default(now()) @map("created_at")

  user            User          @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("payments")
}

enum PaymentType {
  SUBSCRIPTION
  PER_TASK
  ONE_TIME
}

enum PaymentStatus {
  PENDING
  SUCCEEDED
  FAILED
  REFUNDED
}

model Notification {
  id        String             @id @default(uuid())
  userId    String             @map("user_id")
  type      NotificationType
  title     String
  message   String
  isRead    Boolean            @default(false) @map("is_read")
  data      Json?
  createdAt DateTime           @default(now()) @map("created_at")

  user      User               @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([isRead])
  @@map("notifications")
}

enum NotificationType {
  TASK_ASSIGNED
  TASK_COMPLETED
  TASK_OVERDUE
  PAYMENT_DUE
  PAYMENT_SUCCESS
  EMERGENCY_ALERT
}

model InventoryItem {
  id            String    @id @default(uuid())
  propertyId    String    @map("property_id")
  name          String
  category      String
  quantity      Int
  minQuantity   Int       @default(5) @map("min_quantity")
  unit          String    // buc, l, kg
  cost          Decimal?  @db.Decimal(10, 2)
  supplier      String?
  lastRestocked DateTime? @map("last_restocked")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  property      Property  @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  logs          InventoryLog[]

  @@index([propertyId])
  @@map("inventory_items")
}

model InventoryLog {
  id        String    @id @default(uuid())
  itemId    String    @map("item_id")
  quantity  Int       // Can be negative for usage
  type      LogType
  notes     String?
  createdAt DateTime  @default(now()) @map("created_at")

  item      InventoryItem @relation(fields: [itemId], references: [id], onDelete: Cascade)

  @@index([itemId])
  @@map("inventory_logs")
}

enum LogType {
  RESTOCK
  USAGE
  ADJUSTMENT
}
```

### Pas 3: Generate Prisma Client

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Pas 4: Setup Docker pentru development

**Fișier: `apps/backend/docker-compose.yml`**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: bnb-postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: bnb_dev
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: bnb-redis
    restart: always
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

**Start development database:**
```bash
docker-compose up -d
```

### Pas 5: Structură module NestJS

```bash
cd src

# Generate modules
nest g module auth
nest g module users
nest g module properties
nest g module tasks
nest g module payments
nest g module notifications

# Generate controllers
nest g controller auth --no-spec
nest g controller users --no-spec
nest g controller properties --no-spec
nest g controller tasks --no-spec

# Generate services
nest g service auth --no-spec
nest g service users --no-spec
nest g service properties --no-spec
nest g service tasks --no-spec
```

### Pas 6: Environment configuration

**Fișier: `apps/backend/.env.example`**
```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bnb_dev?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="15m"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
REFRESH_TOKEN_EXPIRES_IN="7d"

# App
NODE_ENV="development"
PORT=3000
API_PREFIX="api/v1"

# Supabase
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_KEY="your-service-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Resend)
RESEND_API_KEY="re_..."

# Frontend URLs (CORS)
WEB_DASHBOARD_URL="http://localhost:3001"
MOBILE_APP_URL="exp://localhost:19000"
```

### Pas 7: Main configuration

**Fișier: `apps/backend/src/main.ts`**
```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());
  app.enableCors({
    origin: [
      process.env.WEB_DASHBOARD_URL,
      process.env.MOBILE_APP_URL,
    ],
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix(process.env.API_PREFIX || 'api/v1');

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('BNB Services API')
    .setDescription('API pentru gestionarea serviciilor apartamente')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger docs available at: http://localhost:${port}/docs`);
}
bootstrap();
```

---

## 🌐 Configurare Frontend Web {#frontend-web}

### Pas 1: Create Next.js app

```bash
cd apps
npx create-next-app@latest web-dashboard --typescript --tailwind --app --no-src-dir
cd web-dashboard
```

### Pas 2: Install dependencies

```bash
# UI Components
npx shadcn-ui@latest init

# State management
npm install zustand @tanstack/react-query

# Forms
npm install react-hook-form zod @hookform/resolvers

# API client
npm install axios

# Maps
npm install mapbox-gl @types/mapbox-gl

# Charts
npm install recharts

# Utilities
npm install date-fns clsx tailwind-merge
```

### Pas 3: Setup shadcn/ui

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add form
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add table
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
```

### Pas 4: Structură directoare

```bash
cd app
mkdir -p (auth)/login
mkdir -p (auth)/register
mkdir -p (dashboard)/properties
mkdir -p (dashboard)/tasks
mkdir -p (dashboard)/payments
mkdir -p (dashboard)/settings
```

### Pas 5: Environment configuration

**Fișier: `.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your-mapbox-token
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Pas 6: API Client setup

**Fișier: `lib/api-client.ts`**
```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor pentru JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor pentru refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken }
        );
        
        localStorage.setItem('access_token', data.accessToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 📱 Configurare Mobile App {#mobile-setup}

### Pas 1: Create Expo app

```bash
cd apps
npx create-expo-app mobile-app --template blank-typescript
cd mobile-app
```

### Pas 2: Install dependencies

```bash
# Navigation
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context

# UI Components
npm install react-native-paper react-native-vector-icons
npx expo install react-native-svg

# State management
npm install @reduxjs/toolkit react-redux @tanstack/react-query

# Forms
npm install react-hook-form zod

# Camera & Images
npx expo install expo-camera expo-image-picker expo-image-manipulator

# Location & Maps
npx expo install expo-location react-native-maps

# Notifications
npx expo install expo-notifications

# Storage
npx expo install expo-secure-store @react-native-async-storage/async-storage

# API
npm install axios
```

### Pas 3: App configuration

**Fișier: `app.json`**
```json
{
  "expo": {
    "name": "BNB Services",
    "slug": "bnb-services",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.bnb.services",
      "infoPlist": {
        "NSCameraUsageDescription": "Aplicația necesită acces la cameră pentru a încărca poze înainte/după curățenie.",
        "NSLocationWhenInUseUsageDescription": "Aplicația necesită locația pentru check-in la proprietate."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.bnb.services",
      "permissions": [
        "CAMERA",
        "ACCESS_FINE_LOCATION",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "plugins": [
      "expo-camera",
      "expo-location",
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#ffffff"
        }
      ]
    ]
  }
}
```

### Pas 4: Structură directoare

```bash
mkdir -p src/screens/auth
mkdir -p src/screens/tasks
mkdir -p src/components/common
mkdir -p src/components/tasks
mkdir -p src/navigation
mkdir -p src/store/slices
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/types
```

---

## 🔄 CI/CD Pipeline {#cicd}

### GitHub Actions Workflow

**Fișier: `.github/workflows/ci.yml`**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: bnb_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/bnb_test

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build all apps
        run: npm run build

  deploy-preview:
    runs-on: ubuntu-latest
    needs: build
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel Preview
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 🎨 Design System {#design-system}

### Culori (Tailwind Config)

**Fișier: `packages/config/tailwind.config.js`**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',  // Main
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fef3c7',
          500: '#f59e0b',
          700: '#b45309',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
};
```

### Componente reutilizabile

**Structură: `packages/ui-components/src/`**
- Button (primary, secondary, outline, ghost)
- Card (dashboard cards)
- Input (text, number, email, password)
- Select (dropdown)
- Modal (dialog)
- Toast (notifications)
- Badge (status indicators)
- Avatar (user profile)
- Table (data tables)
- Loader (loading states)

---

## 📝 Checklist Setup Complet

### Backend
- [ ] NestJS app funcțional
- [ ] Prisma configurată & migrări rulate
- [ ] Docker Compose pornit (Postgres + Redis)
- [ ] Environment variables configurate
- [ ] Swagger documentation accesibilă
- [ ] Health check endpoint funcțional (`/health`)

### Frontend Web
- [ ] Next.js app pornește (`npm run dev`)
- [ ] shadcn/ui components instalate
- [ ] Tailwind CSS funcțional
- [ ] API client configurat
- [ ] Environment variables setate
- [ ] Design tokens aplicați

### Mobile
- [ ] Expo app pornește (`npx expo start`)
- [ ] Navigation setup complet
- [ ] UI components instalate
- [ ] API client configurat
- [ ] Permissions configurate în app.json

### Infrastructure
- [ ] GitHub repository creat
- [ ] CI/CD pipeline funcțional
- [ ] Supabase project creat
- [ ] Stripe account configurat (test mode)

### Documentation
- [ ] README.md cu instrucțiuni setup
- [ ] API documentation (Swagger)
- [ ] Contributing guidelines
- [ ] Code of conduct

---

## 🚀 Comenzi utile

```bash
# Development (rulează toate app-urile)
npm run dev

# Build all
npm run build

# Lint
npm run lint

# Test
npm run test

# Clean
npm run clean

# Database
cd apps/backend
npx prisma studio              # Database GUI
npx prisma migrate dev         # Run migrations
npx prisma migrate reset       # Reset database
npx prisma db seed             # Seed data

# Mobile
cd apps/mobile-app
npx expo start                 # Start Expo
npx expo start --ios           # iOS simulator
npx expo start --android       # Android emulator
```

---

**Succes la implementare! 🎉**

*Pentru întrebări sau probleme, deschide un issue pe GitHub.*
