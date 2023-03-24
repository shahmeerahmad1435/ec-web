import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  title: ReactNode;
};
export default function Layout({ title, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title> {title ? title + 'Ahmad' : 'Shahmeer Ahmad'}</title>
        <meta name="description" content="Shahmeer Ahmad website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex px-4 h-12 items-center justify-between shadow-md">
            <Link href="/" legacyBehavior>
              <a className="font-bold text-lg">Shahmeer Ahmad</a>
            </Link>
            <div>
              <Link href="/cart" legacyBehavior>
                <a className="px-2">Cart</a>
              </Link>
              <Link href="/login" legacyBehavior>
                <a className="px-2">Login</a>
              </Link>
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
