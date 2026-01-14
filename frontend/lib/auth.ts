import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),


  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const token = account.id_token
        try {
          const baseUrl = process.env.BACKEND_API_URL || "http://localhost:4000";
          const res = await fetch(`${baseUrl}/api/v1/auth/google-sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          })
          if (res.ok) {
            const data = await res.json();
            (user as any).backendToken = data.data.token;
            return true;
          } else {
            const errorText = await res.text();
            console.error("Backend sync failed with status:", res.status, errorText);
            return false; // Prevent login if sync fails
          }
        } catch (error) {
          console.error("Backend sync failed:", error);
          return false;
        }
      }
      return true
    },


    async jwt({ token, account, user }) {
      if (account?.id_token) {
        token.idToken = account.id_token;
      }
      if (user) {
        token.backendToken = (user as any).backendToken;
      }
      return token;
    },
    async session({ token, session }) {
      session.idToken = token.idToken;
      session.backendToken = (token as any).backendToken;
      if (session.user) {
        (session.user as any).backendToken = (token as any).backendToken;
      }
      return session;
    }
  },
  pages: {
    signIn: "/sign-in",
  },
})














// Credentials({
//   name: "Credentials",
//   credentials: {
//     email: { label: "Email", type: "email" },
//     password: { label: "Password", type: "password" }
//   },
//   async authorize(credentials) {
//     if (!credentials) return null;


//     const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: credentials.email,
//         password: credentials.password,
//       })
//     })

//     if (!res.ok) {
//       return null
//     }

//     const user = await res.json();

//     return {
//       id:user.id,
//       email:user.email,
//       name:user.name,
//       role:user.role
//     }
//   }
// },

// )