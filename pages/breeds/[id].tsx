import type { NextPage } from "next";
import { API_KEY } from "../../.env.js";
import { AppContext } from "../../context/AppData";
import { useContext } from "react";
// import { useEffect, useContext } from "react";
// import Head from 'next/head'
// import Image from 'next/image'
import styles from '../../styles/Breeds.module.css'
// import { GetStaticProps } from "next";

export const getStaticPaths = async () => {
    const url = "https://api.thecatapi.com/v1/breeds";
    const res = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
        },
    });

    const data = await res.json();
    const clean_data: any = [];
    data.map((breeds: any) => {
        if (breeds.image && breeds) {
            clean_data.push(breeds);
        }
    });
    const paths = clean_data.map((item: any) => {
        if (item) {
            return {
                params: { id: item.id, name: item.name },
            };
        }
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context: any) => {
    // const url =
    //     "https://api.thecatapi.com/v1/breeds/search?q=" +
    //     context.params.name.split(" ")[0];

    const url =
        "https://api.thecatapi.com/v1/images/search?breed_id=" +
        context.params.id;
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

const Details: NextPage<{ data: any; image_url: any }> = ({ data }) => {
    const cat_data = data[0];
    return (
        <div className={styles.breeds_details}>
            <h2>
                More Information about <span>{cat_data.breeds[0].name}</span>
            </h2>
            <img src={cat_data.url} />
            <p> also called: <span>{cat_data.breeds[0].alt_names}</span></p>
            <p className={styles.description}>"{cat_data.breeds[0].description}"</p>
            <p>Origin Country: <span>{cat_data.breeds[0].origin}</span></p>
            <p>Temperament: <span> {cat_data.breeds[0].temperament}</span></p>
            <p>Life Span: between: <span> {cat_data.breeds[0].life_span} years </span> </p>
            <p>
                The cat weig about: between: <span> {cat_data.breeds[0].weight.imperial}kg </span>
            </p>

            <a className={styles.button} href={cat_data.breeds[0].wikipedia_url}> Read More </a>
        </div>
    );
};

export default Details;
