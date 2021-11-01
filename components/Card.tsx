import { FC } from "react"
import Link from "next/link"
// import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Card.module.css'

const Card: FC<{ linkto: string, text: string }> = ({ linkto, text }) => {
  return (
    <Link href={linkto}>
        <a className={styles.card}>
        <h2>{text}</h2>
        </a>
    </Link>
  )
}

export default Card
