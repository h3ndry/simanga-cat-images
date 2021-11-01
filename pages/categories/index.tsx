import type { NextPage } from 'next'
import { API_KEY } from "../../.env.js"
import Card from '../../components/Card'
import styles from '../../styles/Breeds.module.css'


export const getStaticProps = async () => {
    const url = "https://api.thecatapi.com/v1/categories";
    const res = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
        },
    });

    const data = await res.json();

    return {
        props: { data },
    };
};


const Catergories: NextPage<{ data: any }> = ({ data }) => {
  return (
  <>
   <h2>Cat Catergories List </h2>
   <div className={styles.categories_list} >
    {data.map((item:any) => (
    <Card key={item.id} linkto={`/categories/${item.id}`} text={item.name} />
    ))}
</div>
    </>
  )
}

export default Catergories

