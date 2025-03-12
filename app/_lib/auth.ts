import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { Session } from "next-auth";
import { User } from "next-auth";
import { createGuest, getGuest } from "./data-service";

// Расширение типа User
declare module "next-auth" {
  interface User {
    guestId?: string;
  }
  interface Session {
    user?: User;
  }
}

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({
      auth,
      request: { nextUrl },
    }: {
      auth: Session | null;
      request: { nextUrl: URL };
    }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/account");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
    },
    async signIn({ user }: { user: User }) {
      try {
        const existingGuest = await getGuest(user.email as string);
        if (!existingGuest) {
          await createGuest({
            email: user.email as string,
            fullName: user.name as string,
            nationality: "",
            nationalID: "",
            countryFlag: "",
          });
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async session({ session }: { session: Session }) {
      if (!session.user) {
        return session;
      }

      const guest = await getGuest(session.user.email as string);
      if (!guest) {
        return session;
      }
      session.user.guestId = guest.id.toString();
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);

export { GET, POST, auth, signIn, signOut };
