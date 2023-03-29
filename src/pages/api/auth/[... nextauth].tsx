import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';
import db from '@/utils/db';
import User from '../../../../models/User';

export default NextAuth({
  //   session: {
  //     strategy: 'jwt',
  //   },

  //   callbacks: {
  //     async jwt({ token, user }) {
  //       if (user?._id) token._id = user._id;
  //       if (user?.isAdmin) token.isAdmin = user.isAdmin;
  //       return token;
  //     },
  //     async session({ session, token }) {
  //       if (token?._id) session.user._id = token._id;
  //       if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
  //       return session;
  //     },
  //   },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };
        console.log(user);
        if (user) {
          console.log('user true');
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
      //   name: 'Credentails',
      //   credentials: {
      //     email: { label: 'email', type: 'text', placeholder: 'moon' },
      //     password: { label: 'password', type: 'password' },
      //   },
      //   async authorize(credentials, req) {
      //     await db.connect();
      //     const user = await User.findOne({ email: credentials?.email! });
      //     await db.disconnect();
      //     if (user && bcrypt.compareSync(credentials?.password!, user.password)) {
      //       return {
      //         _id: user._id,
      //         name: user.name,
      //         email: user.email,
      //         isAdmin: user.isAdmin,
      //       };
      //     }
      //     return user;
      //   },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.user = token;
      return session;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
});
