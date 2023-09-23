import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // async jwt({ token, user }) {
    //   return { ...token, ...user };
    // },
    async session({ session }) {
      const response = await fetch(`${process.env.API_URL}/api/user/check-user/${session.user.email}`, {
        cache: "no-store",
      });
      const data = await response.json();
      const sessionUser = data.data;
      session.user._id = sessionUser._id;
      session.user.username = sessionUser.username;
      return session;
    },
    // @ts-ignore
    async signIn({ user }) {
      const name = user.name as string;
      const email = user.email as string;
      const image = user.image as string;
      const username = email.split("@")[0];

      const responseData = await fetch(`${process.env.API_URL}/api/user/check-user/${email}`);
      try {
        if (responseData.status === 404) {
          const response = await fetch(`${process.env.API_URL}/api/user/add-user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              username: username,
              name: name,
              image: image,
            }),
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(nextAuthOptions);
