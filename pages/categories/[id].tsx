import type { NextPage } from 'next'
import { API_KEY } from "../../.env.js"
// import Head from 'next/head'
// import Image from 'next/image'
// import { GetStaticProps } from "next";

export const getStaticPaths = async () => {
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

    const paths = data.map((item: any) => {
        return {
            params: { id: item.id.toString() },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context: any) => {
    const url =
        "https://api.thecatapi.com/v1/images/search/?category=" +
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

const Details: NextPage<{ data: any }> = ({ data }) => {
    console.log(data);
  return (
  <div>
    what the fuck wrong with you
    <img src={data[0].url} />
    // {data[0].url}
  </div>


  )
};

export default Details;
