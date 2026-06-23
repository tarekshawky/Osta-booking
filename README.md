# OSTA Services — Full Platform (Public Site + Admin/Tech/Customer)

A complete **Next.js 14 + Prisma** platform for OSTA Services (HVAC & technical services),
matching the OSTA dark/blue design. Includes a **public marketing website**, **customer
booking with email notifications**, and a **role-based management dashboard** with full
CRUD and PDF exports.

## Features

### Public website (no login)
- 🏠 **Home** — hero, services, why-choose, how-it-works, CTA
- 🧰 **Services** — service catalogue with pricing
- 👑 **OSTA Prime** — membership plans (Basic / Plus / Elite)
- 📅 **Book Appointment** — multi-step booking flow

### Authentication & roles
- 🔐 NextAuth credentials login + **customer self-registration**
- Three roles: **ADMIN**, **TECHNICIAN**, **CUSTOMER**
- Role-based redirects and route protection (middleware)

### Customer area (`/account`)
- View & cancel appointments, see invoices, book again

### Appointment emails
- On booking, an email is sent to the **customer** and the **admin** (`ADMIN_EMAIL`)
- Uses nodemailer; if SMTP is not configured the email is logged to the server console (no crash)

### Admin / Technician dashboard
- 📊 **Dashboard** — revenue, expenses, net profit, job-status donut, top techs, recent invoices
- 📅 **Appointments** — confirm / complete / cancel / delete (admin)
- 🧾 **Invoices** — create, **edit, delete, download PDF**
- 💸 **Expenses** — create, **edit, delete, download PDF**
- 🛠️ **Jobs** — create/edit/delete (admin); technicians update status of their own jobs
- 👥 **Customers** — create, edit, delete
- 🧑‍🔧 **Technicians** — performance overview
- ➕ **Team Management** — create/edit/delete users and assign roles (admin only)

### PDF export
- Invoices and expenses download as branded PDFs (client-side jsPDF)

## Tech Stack
Next.js 14 (App Router) · TypeScript · Prisma (SQLite) · NextAuth · Tailwind CSS · Recharts · Nodemailer · jsPDF

## Getting Started
```bash
npm install --legacy-peer-deps   # legacy flag avoids a jspdf peer-dep warning
npm run db:push                  # create schema
npm run db:seed                  # demo data
npm run dev                      # http://localhost:3000
```

## Demo Accounts
| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@osta.ae` | `password123` |
| Technician | `rashid@osta.ae` | `password123` |
| Customer | `customer@osta.ae` | `password123` |

## Email setup (optional)
Set these in `.env` to actually send appointment emails (e.g. Gmail App Password, SendGrid, Mailgun SMTP):
```
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="you@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="OSTA Services <no-reply@osta.ae>"
ADMIN_EMAIL="admin@osta.ae"
```
Without these, bookings still work and the email content is printed to the server console.

## Switching to PostgreSQL
1. In `prisma/schema.prisma` set `provider = "postgresql"`.
2. Set `DATABASE_URL` to your Postgres URL.
3. `npm run db:push && npm run db:seed`.

> ⚠️ Change `NEXTAUTH_SECRET` to a strong random value before deploying.

## Structure
```
prisma/schema.prisma   # User, Customer, Job, Invoice, Expense, Appointment
src/app/
  (marketing)/         # public: /, /services, /prime, /book
  account/             # customer dashboard
  login/  register/    # auth
  (app)/               # admin/tech: dashboard, appointments, jobs, invoices,
                       #             expenses, customers, technicians, reports, team
  api/                 # REST routes incl. [id] for update/delete + /register
src/components/        # navbars, tables (*Client), charts, modal
src/lib/               # prisma, auth, email, pdf, format
```
