import '@/styles/globals.css';
import { AppProvider } from '@/utils/appcontext';
import { SessionProvider } from 'next-auth/react';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <AppProvider>
          <Component {...pageProps} />;
        </AppProvider>
      </SessionProvider>
    </>
  );
}
