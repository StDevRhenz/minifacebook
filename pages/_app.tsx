import '../src/styles/globals.css';
import { AuthProvider } from '../src/contexts/AuthContent';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { PostsProvider } from '../src/contexts/PostsContext';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PostsProvider>
          <Component {...pageProps} />
        </PostsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
