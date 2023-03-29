import { AppContext } from '@/utils/appcontext';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

type LayoutProps = {
  children: ReactNode;
  title: ReactNode;
};
export default function Layout({ title, children }: LayoutProps) {
  const { state, dispatch } = useContext(AppContext);
  const { cart } = state;
  const [showChild, rendered] = useState(false);
  const { status, data: session } = useSession();
  useEffect(() => {
    rendered(true);
  }, []);
  if (!showChild) {
    return null;
  }
  return (
    <>
      <Head>
        <title> {title ? title + 'Ahmad' : 'Shahmeer Ahmad'}</title>
        <meta name="description" content="Shahmeer Ahmad website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex px-4 h-12 items-center justify-between shadow-md">
            <Link href="/" legacyBehavior>
              <a className="font-bold text-lg">Shahmeer</a>
            </Link>
            <div>
              <Link href="/Cart" legacyBehavior>
                <a className="px-2">
                  Cart{' '}
                  {cart.cartItems.length > 0 && (
                    <span className="ml-1 bg-red-600 rounded-full  px-2 py-1 text-xs font-bold text-white">
                      {cart.cartItems.reduce((a, c) => a + c.quantity!, 0)}
                    </span>
                  )}
                </a>
              </Link>

              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                session.user.name
              ) : (
                <Link href="/login" legacyBehavior>
                  <a className="px-2">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex items-center justify-center h-10 shadow-inner">
          <p>Copyright @ 2023 Shahmeer Ahmad</p>
        </footer>
      </div>
    </>
  );
}
