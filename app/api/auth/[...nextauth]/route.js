import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare,hash } from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials, process.env.ADMIN_PASSWORD_HASH, "gooooo");
        // Here you would typically check against your database
        // This is a simplified example
       const dad =  await hash('admin@123',10)
       console.log(dad)
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          (await compare(
            credentials?.password,
            dad
          ))
        ) {
          return {
            id: "1",
            email: credentials.email,
            role: "admin",
          };
        }
        // If credentials are invalid, return null
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
});

export { handler as GET, handler as POST };
