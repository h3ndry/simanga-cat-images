import { FC } from "react"
import Link from "next/link"
// import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Button.module.css'

const Button: FC<{ linkto: string, text: string }> = ({ linkto, text }) => {
  return (
    <button className={styles.btn}>
    <Link href={linkto} ><a>{text}</a></Link>
    </button>
  )
}

export default Button
