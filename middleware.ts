import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    return NextResponse.rewrite(new URL('/Cart', req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.sub === 'admin',
    },
  }
);

export const config = { matcher: ['/login', '/Cart'] };
