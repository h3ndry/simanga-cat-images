import { createContext, useContext, ReactNode, useState } from "react";
import { API_KEY } from "../.env.js";

export const AppContext = createContext<any>({});

type Props = {
    children: ReactNode;
};

export function ContextProvider({ children }: Props) {
    const [user_id, setUser_id] = useState<any>("sima_id");
    const [breeds, setBreeds] = useState<any>([]);
    const [page, setPage] = useState(1);
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

            const res_obj: any = await res.json();

            // Temporary Notification system, let the user know when the image
            // has been added to favourites
            if (res_obj.message === "SUCCESS") {
                alert(
                    `Image have been added to Favorites, reload the page for the UI to take effect`
                );
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

            // Temporary Notification system, let the user know when the image
            // has been added to favourites
            if (data.message === "SUCCESS") {
                alert(
                    `Image have been removed to Favorites, reload the page for the UI to take effect`
                );
                console.log(data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    // HACK: The useState for page is givimg me hard time, Will use this variavle
    // to keep track of pages when calling the api.
    let x = 1;

    const addMoreBreeds = async () => {
        if (x < 6) {
            x = x + 1;
            try {
                const b_url = `https://api.thecatapi.com/v1/breeds?page=${x}&limit=10`;
                const b_res = await fetch(b_url, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": API_KEY,
                    },
                });
                const b_data = await b_res.json();
                setBreeds((prev: any) => [...prev, ...b_data]);
                console.log(breeds, x);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const value = {
        breeds,
        categories,
        page,
        favourites,
        user_id,
        setBreeds,
        getBreedsList,
        addToFavourites,
        setFavourite,
        addMoreBreeds,
        removeToFavourites,
    };

    return (
        <>
            <AppContext.Provider value={value}>{children}</AppContext.Provider>
        </>
    );
}
