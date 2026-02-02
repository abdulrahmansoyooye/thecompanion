# 🎨 The Companion Frontend

The user-facing interface for The Companion, built with a focus on speed, aesthetics, and user experience.

## ✨ Highlights
- **💨 Next.js 16 (App Router)**: Leveraging the latest server components and streaming features.
- **✨ Tailwind CSS 4**: Utilizing the cutting-edge CSS framework for a bespoke design system.
- **🎭 Framer Motion**: Smooth, high-performance animations throughout the app.
- **🎙️ Vapi Integration**: Native support for real-time voice conversations.
- **🌓 Dark Mode**: Built-in dark mode support using `next-themes`.

---

## 🛠️ Setup & Development

### 1. Environment Variables
Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# Google Auth
AUTH_GOOGLE_ID="your_google_id"
AUTH_GOOGLE_SECRET="your_google_secret"

# Vapi
NEXT_PUBLIC_VAPI_PUBLIC_KEY="your_vapi_public_key"
```

### 2. Run Locally
```bash
npm install
npm run dev
```

---

## 🏗️ Architecture

- **`app/`**: Next.js App Router pages and layouts.
- **`components/`**: Reusable UI components (Modals, Navbar, etc.).
- **`services/`**: API client logic using Axios.
- **`providers/`**: Context providers for Auth, Theme, and Vapi.
- **`types/`**: Shared TypeScript interfaces.

---

## 📱 Mobile Compatibility
Responsive design is a core pillar of this project. Every feature, from the Companion Builder to the History dashboard, is meticulously tested to ensure a premium experience on mobile and tablet devices.

---

## 🎭 Design System
We use a custom design system built with:
- **Font**: Bricolage Grotesque (Variable)
- **Colors**: Vibrant, modern palette defined in `globals.css`.
- **Interactions**: Subtle hover effects and modal transitions via Framer Motion.
