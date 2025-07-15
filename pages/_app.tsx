import '../src/styles/globals.css';
import Head from 'next/head';
import { AuthProvider } from '../src/contexts/AuthContent';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { PostsProvider } from '../src/contexts/PostsContext';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#6B46C1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💌</text></svg>" />
      </Head>
      <ThemeProvider>
        <AuthProvider>
          <PostsProvider>
            <Component {...pageProps} />
          </PostsProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
