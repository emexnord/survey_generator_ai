import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Ensure user exists or create them
        const res: any = await fetch(
          `/api/user/google/?token${account?.id_token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const dbUser = await res.json();
        console.log("db user", dbUser);

        if (!dbUser?.user) return false;

        return true;
      }

      return true;
    },

    async jwt({ token, account }) {
      if (account?.provider === "google") {
        const res: any = await fetch(
          `/api/user/google/?token=${account?.id_token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const dbUser = await res.json();

        if (dbUser) return { token: dbUser.token, user: dbUser.user };
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
