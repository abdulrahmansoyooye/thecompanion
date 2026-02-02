#  The Companion

> **Real-time AI Conversation Platform for Students and Developers.**

[![Next.js](https://img.shields.io/badge/Next.js-16%20(Beta)-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.2-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Express](https://img.shields.io/badge/Express-5.1-lightgrey?style=flat-square&logo=express)](https://expressjs.com/)

**The Companion** is a sophisticated AI-powered interaction platform designed to bridge the gap between human curiosity and artificial intelligence. Whether you are a student looking for a study buddy or a developer wanting to test voice-based AI capabilities, The Companion provides a seamless, real-time experience.

---

## ✨ Features

- ** Personalized AI Companions**: Create and customize your own AI companions. Tailor their name, personality, voice, and even the subject they specialize in.
- **🎙️ Real-time Voice Interaction**: Experience ultra-low latency voice conversations powered by Vapi AI.
- **📜 Learning Journey**: Track your growth and past interactions through an intuitive history dashboard.
- **🔖 Bookmark & Save**: Keep track of your favorite companions for quick access.
- **🎨 Modern & Responsive UI**: A premium, glassmorphic design built with Tailwind CSS 4 and Framer Motion, optimized for every screen size.
- **🔐 Secure Authentication**: Robust session management using Next-Auth and JWT-based backend verification.

---

## 🏗️ Project Structure

This project is organized as a monorepo split into two main sections:

```text
thecompanion/
├── frontend/        # Next.js 16 application (The User Interface)
└── backend/         # Node.js + Express + Prisma (The Engine)
```

### 💻 Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI & Lucide Icons
- **State Management**: React Hooks & Context API
- **Voice Engine**: Vapi AI Web SDK

### ⚙️ Backend
- **Server**: Express 5.1
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT & Bcrypt
- **Cloud Storage**: Cloudinary (for profile/icon assets)
- **Validation**: Zod & Express-validator

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Cloudinary Account (for image handling)
- Vapi AI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/thecompanion.git
   cd thecompanion
   ```

2. **Configure Backend**
   Navigate to the backend directory and set up your environment:
   ```bash
   cd backend
   npm install
   cp .env.example .env # Add your DB_URL, JWT_SECRET, etc.
   npx prisma migrate dev
   npm run dev
   ```

3. **Configure Frontend**
   Open a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local # Add your AUTH_GOOGLE_ID, NEXT_PUBLIC_BACKEND_URL, etc.
   npm run dev
   ```

---

## 🛠️ Tech Stack & Dependencies

| Tool | Usage |
| :--- | :--- |
| **Next.js 16** | Frontend Framework with Server Components |
| **Prisma 7** | Type-safe Database ORM |
| **Vapi AI** | Real-time voice interaction |
| **Framer Motion** | Fluid UI animations |
| **Sonner** | Modern toast notifications |
| **Next-Auth** | Seamless authentication flow |

---

## 🤝 Contributing

We welcome contributions! Whether it's fixing a bug or suggesting a new feature, feel free to open an issue or submit a pull request. 

1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Built with ❤️ for the next generation of learners and creators.*
