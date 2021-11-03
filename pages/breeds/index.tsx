import type { NextPage } from "next";
import Item from "../../components/Item";
// import Head from 'next/head'
// import Image from 'next/image'
import styles from "../../styles/Breeds.module.css";
import { AppContext } from "../../context/AppData";
import { useEffect, useState, useContext, useRef, useCallback } from "react";
import { API_KEY } from "../../.env.js";

export const getStaticProps = async () => {
    const b_url = "https://api.thecatapi.com/v1/breeds?page=1&limit=10";
    const b_res = await fetch(b_url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
        },
    });

    const f_url = "https://api.thecatapi.com/v1/favourites?sub_id=sima_id";
    const f_res = await fetch(f_url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": API_KEY,
        },
    });

    const b_data = await b_res.json();
    const f_data = await f_res.json();

    const m_data = [];

    for (let i = 0; i < b_data.length; i++) {
        let isFavourite = false;
        let favourite_id;
        for (let j = 0; j < f_data.length; j++) {
            if (b_data[i].id === f_data[j].image_id) {
                isFavourite = true;
                favourite_id = f_data[j].id;
            }
        }
        if (isFavourite) {
            const tmpObj = { ...b_data[i], isFavourite, favourite_id };
            m_data.push(tmpObj);
        } else {
            const tmpObj = { ...b_data[i], isFavourite };
            m_data.push(tmpObj);
        }
    }

    return {
        props: { m_data },
    };
};

const Breeds: NextPage<{ m_data: any }> = ({ m_data }) => {
    const { page, breeds, setBreeds, addMoreBreeds } = useContext(AppContext);


    const observer = useRef();

    useEffect(() => {
        if (page === 1) {
            setBreeds(m_data);
        }

            const btnObserver: any = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    addMoreBreeds();
                }
            });

            btnObserver.observe(observer.current);

    }, []);

    // console.log(page);
    return (
        <>
            <h2>Cat Breeds List</h2>
            <div className={styles.breeds_list}>
                {breeds.map((item: any, index: any) => {
                    return <Item key={item.id} {...item} index={index} />;
                })}
            </div>
            <button
                className={styles.load_more_btn}
                ref={observer}
                onClick={() => {
                    addMoreBreeds();
                }}
            >
                loading...
            </button>
        </>
    );
};

export default Breeds;
