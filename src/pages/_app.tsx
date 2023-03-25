import '@/styles/globals.css';
import { AppProvider } from '@/utils/Store';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProvider>
        <Component {...pageProps} />;
      </AppProvider>
    </>
  );
}
