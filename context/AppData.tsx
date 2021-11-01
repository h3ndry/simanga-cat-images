import { createContext, useContext, ReactNode, useState } from "react";
import { API_KEY } from "../.env.js";

export const AppContext = createContext<any>({});

type Props = {
    children: ReactNode;
};

export function ContextProvider({ children }: Props) {
    const [user_id, setUser_id] = useState<any>("sima_id");
    const [breeds, setBreeds] = useState<any>([]);
    const [categories, setCategories] = useState<any>([]);
    const [favourites, setFavourite] = useState<any>([]);

    const getBreedsList = async (p_no: number) => {
        try {
    const url = `https://api.thecatapi.com/v1/breeds?page=${p_no}&limit=10`;
            const res = await fetch(url, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": API_KEY,
                },
            });

            const data = await res.json();
            const clean_data: any = [];
            data.map((breeds: any) => {
                if (breeds.image && breeds) {
                    clean_data.push(breeds);
                }
            });

            // setBreeds(clean_data);
        } catch (e) {
            console.log(e);
        }
    };

    const addToFavourites = async (id: any) => {
        try {
            const data = {
                image_id: id,
                sub_id: user_id,
            };

            const res = await fetch(`https://api.thecatapi.com/v1/favourites`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": API_KEY,
                },
                body: JSON.stringify(data),
            });

            const res_obj: any = await res.json()

            if (res_obj.message === "SUCCESS"){
             alert(`Image have been added to Favorites, reload the page for the UI to take effect`)
            console.log(res_obj);
            }


        } catch (e) {
            console.log(e);
        }
    };

    const removeToFavourites = async (id: any) => {
        try {
            const res = await fetch(
                `https://api.thecatapi.com/v1/favourites/${id}`,
                {
                    method: "DELETE",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": API_KEY,
                    },
                }
            );

            const data = await res.json();

            if (data.message === "SUCCESS"){
             alert(`Image have been removed to Favorites, reload the page for the UI to take effect`)
            console.log(data);
            }

        } catch (e) {
        console.log(e);
}
    };

    const value = {
        breeds,
        categories,
        favourites,
        user_id,
        setBreeds,
        getBreedsList,
        addToFavourites,
        setFavourite,
        removeToFavourites,
    };

    return (
        <>
            <AppContext.Provider value={value}>{children}</AppContext.Provider>
        </>
    );
}
