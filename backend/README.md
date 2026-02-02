# ⚙️ The Companion Backend

The robust engine powering The Companion platform. This backend manages user data, AI companion configurations, and session history using a modern TypeScript stack.

## 🚀 Key Technologies
- **Runtime**: Node.js (Latest)
- **Framework**: Express 5.1 (Beta-ready)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma 7
- **Logging**: Winston
- **Validation**: Zod + Express-validator

---

## 🛠️ Getting Started

### 1. Environment Configuration
Create a `.env` file in this directory with the following variables:

```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/thecompanion"
JWT_SECRET="your_jwt_secret"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### 2. Database Setup
Ensure PostgreSQL is running, then run:
```bash
npm run postinstall # Generates Prisma Client
npx prisma db push  # Syncs schema with database
```

### 3. Dev Server
```bash
npm run dev
```

---

## 📂 Project Structure

- `src/controllers/`: Logic for handling requests.
- `src/services/`: Reusable business logic and database interactions.
- `src/routes/`: API endpoint definitions.
- `src/middlewares/`: Auth checks, logging, and error handling.
- `prisma/`: Database schema and migrations.

---

## 📡 API Endpoints (Core)

### Authentication
- `POST /auth/register` - Create a new user.
- `POST /auth/login` - Authenticate and receive a token.

### Companions
- `GET /companions` - List user created companions.
- `POST /companions` - Create a new AI companion.
- `GET /companions/:id` - Get details of a specific companion.
- `DELETE /companions/:id` - Delete a companion.

### History
- `GET /history` - Get user interaction history.

---

## 🛡️ Security & Validation
- **JWT**: Secure password-less authentication for subsequent requests.
- **Bcrypt**: Hashing for stored credentials.
- **Zod**: Runtime type checking for API payloads.

---

## 📜 Error Handling
The backend uses a centralized error middleware to ensure consistent responses. Logs are captured using Winston and stored in the `logs/` directory for debugging.
