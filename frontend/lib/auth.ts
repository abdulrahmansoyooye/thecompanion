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

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;


        const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          })
        })

        if (!res.ok) {
          return null
        }

        const user = await res.json();

        return {
          id:user.id,
          email:user.email,
          name:user.name,
          role:user.role
        }
      }
    },

    )
  ],

  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string

      }
      return session
    }
  },
  pages: {
    signIn: "/auth/sign-in",
  },
})