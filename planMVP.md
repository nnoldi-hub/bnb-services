\# 🏗️ Roadmap Dezvoltare Aplicație Servicii Apartamente (MVP → Scalare)



\## 1. 🎯 Obiectiv general

Construirea unei aplicații care gestionează:

\- Curățenie între check-in/check-out

\- Intervenții tehnice de urgență

\- Întreținere periodică

\- Inventar consumabile

\- Comunicare proprietar ↔ echipe



\---



\## 2. 🧩 Tehnologii recomandate



\### Backend

\- Node.js + TypeScript

\- Supabase sau Firebase (pentru MVP rapid)

\- Funcții serverless pentru logica principală



\### Frontend Web

\- React (dashboard proprietari + admin)



\### Mobile App

\- React Native (echipe curățenie / intervenții)



\### Alte servicii

\- Stripe (plăți)

\- Mapbox / Google Maps (localizare, rute)

\- Notificări push (Expo / Firebase Cloud Messaging)



\---



\## 3. 🚀 Etapele dezvoltării



\## Etapa 1 — MVP (0–3 luni)

\### 🎯 Scop: lansare rapidă, funcționalități esențiale



\#### 1.1. Arhitectură \& Design

\- Definire flow-uri utilizatori (owner, echipă, admin)

\- Wireframes pentru aplicația mobilă și dashboard

\- Configurare proiect (repo, CI/CD, environment)



\#### 1.2. Backend (Supabase/Firebase)

\- Autentificare utilizatori

\- Structură bază de date:

&#x20; - Users

&#x20; - Properties

&#x20; - Tasks (curățenie, intervenții)

&#x20; - Photos

&#x20; - Payments

\- API pentru:

&#x20; - Creare task

&#x20; - Alocare task

&#x20; - Upload poze

&#x20; - Notificări



\#### 1.3. Aplicație mobilă (React Native)

\- Login

\- Listă task-uri

\- Check-in/check-out la locație

\- Upload poze înainte/după

\- Confirmare finalizare



\#### 1.4. Dashboard web (React)

\- Login proprietar

\- Adăugare apartamente

\- Vizualizare status curent

\- Programare curățenie

\- Istoric intervenții



\#### 1.5. Plăți \& notificări

\- Stripe: plăți per task sau abonament

\- Notificări push pentru echipe



\#### 1.6. Testare \& lansare

\- Testare internă

\- Beta cu 2–3 proprietari reali

\- Optimizări



\---



\## Etapa 2 — Versiunea 1.0 (3–6 luni)

\### 🎯 Scop: automatizare + integrare platforme



\#### 2.1. Integrare Airbnb / Booking

\- Sincronizare rezervări

\- Programare automată curățenie după check-out



\#### 2.2. Funcții avansate

\- Inventar consumabile

\- Rapoarte costuri

\- SLA-uri pentru intervenții

\- Chat intern proprietar ↔ echipă



\#### 2.3. Optimizare rute echipe

\- Google Maps Directions API

\- Estimare timp sosire



\#### 2.4. Admin panel avansat

\- Management echipe

\- Alocare automată task-uri

\- Monitorizare performanță



\---



\## Etapa 3 — Scalare (6–12 luni)

\### 🎯 Scop: transformarea aplicației într-un marketplace complet



\#### 3.1. Marketplace furnizori

\- Firme externe de curățenie/intervenții pot intra în platformă

\- Sistem de rating \& review



\#### 3.2. Automatizări AI

\- Predicție consumabile

\- Detectare perioade aglomerate

\- Recomandări optimizare costuri



\#### 3.3. Funcții enterprise

\- Multi-property management

\- Contracte corporate

\- API public pentru integrări



\---



\## 4. 📊 KPI-uri de urmărit

\- Timp mediu de intervenție

\- Cost per apartament

\- Număr task-uri finalizate

\- Rata de retenție proprietari

\- Venit lunar recurent (MRR)



\---



\## 5. 🧱 Structura bazei de date (simplificată)



\### Users

\- id

\- name

\- role (owner, team, admin)

\- phone

\- email



\### Properties

\- id

\- owner\_id

\- address

\- gps\_location



\### Tasks

\- id

\- property\_id

\- type (cleaning, emergency, maintenance)

\- status (pending, in\_progress, done)

\- assigned\_to

\- scheduled\_at

\- completed\_at



\### Photos

\- id

\- task\_id

\- url

\- type (before, after)



\### Payments

\- id

\- user\_id

\- amount

\- type (subscription, per\_task)

\- status



\---



\## 6. 🗺️ Timeline sumar



| Etapă | Durată | Rezultat |

|-------|--------|----------|

| MVP | 0–3 luni | Aplicație funcțională pentru proprietari + echipe |

| Versiunea 1.0 | 3–6 luni | Automatizări + integrare Airbnb |

| Scalare | 6–12 luni | Marketplace + AI |



\---



\## 7. 🧩 Next steps

\- Validare MVP cu 3–5 proprietari

\- Ajustare funcționalități

\- Lansare publică

\- Marketing \& parteneriate





