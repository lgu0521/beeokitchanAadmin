import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/frame/layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico"></link>
        <link rel="icon" type="image/x-icon" href="/images/favicon.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
