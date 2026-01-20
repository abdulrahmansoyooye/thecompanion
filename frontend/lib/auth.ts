import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {

    async signIn({ user, account }) {
      if (!account || account.provider !== "google") return true;

      if (!account.id_token) {
        console.error("Missing Google ID token");
        return false;
      }

      try {
        const res = await fetch(
          `${process.env.BACKEND_API_URL}/api/v1/auth/google-sync`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${account.id_token}`
            }
          }
        );

        if (!res.ok) return false;

        const response = await res.json();
        const data = response?.data
        
        user.backendToken = data.token;
        user.backendUserId = data.user.id;

        return true;
      } catch (err) {
        console.error("Google backend sync error:", err);
        return false;
      }
    },

    /**
     * Persist backend JWT into NextAuth token
     */
    async jwt({ token, user }) {
      if (user?.backendToken) {
        token.backendToken = user.backendToken;
        token.userId = user.backendUserId
      }
      return token;
    },

    /**
     * Expose backend JWT in session
     */
    async session({ session, token }) {
      session.user.id = token.userId as string;
      session.backendToken = token.backendToken as string;
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
    error: "/auth-error",
  },
});
