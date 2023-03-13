import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import User from "@/models/User";
import db from "@/utils/db";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req, res) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const { email, password } = credentials;
        const test = await User.findOne({ email });
        if (!test) {
          throw new Error(
            "Bu email adresiyle kayıtlı kullanıcı bulunamamıştır."
          );
        } else {
          const testPassword = await bcrypt.compare(password, test.password);
          if (!testPassword) {
            throw new Error("Kullanıcı adı ve parola yanlış.");
          } else {
            return test;
          }
        }
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async session({ session, token }) {
      const user = await User.findById(token.sub);
      session.user.id = token.sub;
      session.user.name = user.name;
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    singIn: "/my-account",
  },
};
export default NextAuth(authOptions);
