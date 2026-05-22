# OSTA Services – HVAC & Technical Services Platform

![OSTA Services Preview](https://github.com/tarekshawky/Osta-booking/preview.jpg)

A modern HVAC and technical services platform built with **Next.js**, **TailwindCSS**, and modern UI components.
The platform allows customers to book AC services online, manage appointments, track invoices, and explore technical services through a premium dashboard experience.

---

# 🚀 Features

## 🌐 Public Website

* Modern responsive landing page
* HVAC & technical services showcase
* Hero section with CTA
* Services section
* Customer testimonials
* Why choose us section
* Contact section
* Fully mobile responsive

---

## 📅 Appointment Booking System

* Multi-step booking form
* Select service
* Choose date & time
* Customer information form
* Booking confirmation
* Validation handling

---

## 👤 Customer Dashboard

* Upcoming appointments
* Invoice management
* Rewards points
* Recent services
* Service history
* Review & rating system
* Rebook services
* Warranty tracking

---

## 🛠 Services Included

* AC Repair
* AC Maintenance
* AC Installation
* Gas Refilling
* Duct Cleaning
* Technical Support

---

# 🧑‍💻 Tech Stack

## Frontend

* Next.js 15
* React 19
* TypeScript
* TailwindCSS
* Shadcn/UI
* Lucide Icons
* Framer Motion

---

## Backend

* Next.js API Routes
* Prisma ORM
* PostgreSQL / MySQL

---

## Authentication

* NextAuth.js / Auth.js
* JWT Authentication
* Protected Dashboard Routes

---

# 📁 Project Structure

```bash
src/
│
├── app/
│   ├── page.tsx
│   ├── services/
│   ├── dashboard/
│   ├── booking/
│   └── api/
│
├── components/
│   ├── ui/
│   ├── site/
│   ├── dashboard/
│   └── booking/
│
├── lib/
├── prisma/
├── hooks/
├── types/
└── styles/
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/osta-services.git
```

---

## 2️⃣ Navigate to Project

```bash
cd osta-services
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## 4️⃣ Setup Environment Variables

Create `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/osta"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 5️⃣ Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

---

## 6️⃣ Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# 🗄 Prisma Models Example

```prisma
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  bookings  Booking[]
  invoices  Invoice[]
}

model Booking {
  id          String   @id @default(cuid())
  service     String
  date        DateTime
  status      String
  userId      String
  user        User     @relation(fields: [userId], references: [id])
}

model Invoice {
  id        String   @id @default(cuid())
  amount    Float
  status    String
  createdAt DateTime @default(now())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
}
```

---

# 🎨 UI Highlights

* Dark premium interface
* Glassmorphism cards
* Responsive layouts
* Smooth animations
* Modern typography
* Clean booking workflow
* Dashboard analytics

---

# 📱 Responsive Design

Optimized for:

* Mobile
* Tablet
* Laptop
* Desktop

---

# 🔒 Security Features

* Secure authentication
* Protected routes
* API validation
* Prisma ORM protection
* Environment variables support

---

# 📸 Pages Included

## Home Page

* Hero section
* Service categories
* Benefits
* Testimonials
* CTA section

## Booking Page

* Service selection
* Calendar picker
* Time slots
* User details form

## Dashboard

* Appointments
* Invoices
* Rewards
* Reviews

## Services Page

* Detailed service cards
* Service descriptions
* Booking CTA

---

# 🚀 Future Improvements

* Real-time notifications
* Admin dashboard
* Payment gateway integration
* Live technician tracking
* Multi-language support
* Email automation
* SMS notifications

---

# 📦 Deployment

## Vercel

```bash
vercel
```

## Build Production

```bash
npm run build
```

---

# 👨‍💻 Author

## Tarek Shawky

Frontend Developer specializing in:

* Next.js
* React
* TailwindCSS
* TypeScript
* WordPress

Portfolio:

[Tarek Shawky Portfolio](https://tarekshawky.vercel.app?utm_source=chatgpt.com)

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you like this project, please give it a ⭐ on GitHub.
