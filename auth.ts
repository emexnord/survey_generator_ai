import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    accessToken?: string;
    refreshToken?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google") {
        // Ensure user exists or create them
        const res: any = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/google/?token=${account?.id_token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const dbUser = await res.json();

        if (!dbUser?.user) return false;

        return true;
      }

      return true;
    },

    async jwt({ token, account }) {
      if (account?.provider === "google") {
        const res: any = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/google/?token=${account?.id_token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const dbUser = await res.json();

        if (dbUser) {
          token.accessToken = dbUser.tokens.accessToken;
          token.refreshToken = dbUser.tokens.refreshToken;
          token.email = dbUser.user.email;
        }
      }

      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      // Attach tokens to session
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user.email = token.email;
      return session;
    },
  },
});
