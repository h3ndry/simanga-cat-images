import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Button from '../components/Button'
import { ContextProvider } from '../context/AppData'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <ContextProvider>
  <Layout>
    <Button linkto="/" text="Home" />
    <div className="big-cycle"></div>
    <div className="small-cycle"></div>
    <Component {...pageProps} />
  </Layout>
  </ContextProvider>
  )
}

export default MyApp
