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
        await db.connectDb();
        const test =
          (await User.findOne({ email })) ||
          (await User.findOne({ username: email }));
        if (!test) {
          await db.disconnectDb();
          throw new Error(
            "Bu email adresiyle kayıtlı kullanıcı bulunamamıştır."
          );
        } else {
          const testPassword = await bcrypt.compare(password, test.password);
          if (!testPassword) {
            await db.disconnectDb();

            throw new Error("Kullanıcı adı veya parola yanlış.");
          } else {
            await db.disconnectDb();

            return test;
          }
        }
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async session({ session, token}) {
      await db.connectDb();
      const user = await User.findById(token.sub);
      session.user.id = token.sub;
      session.user.role = user.role || "user";
      token.role = user.role || "user";
      await db.disconnectDb();
      return session;
    },
  },
  secret: process.env.SECRET_KEY,
  session: {
    strategy: "jwt",
  },
};
export default NextAuth(authOptions);
