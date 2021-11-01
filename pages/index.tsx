import type { NextPage } from 'next'
import Card from '../components/Card'
// import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Card.module.css'

const Home: NextPage = () => {
  return (
  <div className={styles.container}>
    <Card linkto="/breeds" text="Breeds" />
    <Card linkto="/categories" text="Categories"/>
    <Card linkto="/favourites" text="favourites" />
    </div>
  )
}

export default Home
