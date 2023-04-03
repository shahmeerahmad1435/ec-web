import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({

      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {


        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }


        if (user) {

          return user
        } else {

          return null


        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      return ({ ...token, ...user });
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;

    }
  },
  pages: {
    signIn: "/auth/login"
  }
}


function NextAuth() {


  throw new Error("Function not implemented.");
}

export default NextAuth


