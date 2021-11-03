import { FC } from "react";
import Link from "next/link";
import styles from "../styles/Card.module.css";
import { AppContext } from "../context/AppData";
import { useContext, useEffect, useRef } from "react";

type Props = {
    name: string;
    image: {
        url: string;
    };
    id: any;
    isFavourite: boolean;
    favourite_id: number;
};

const Item: FC<Props> = ({ name, image, id, isFavourite, favourite_id }) => {
    const { addToFavourites, removeToFavourites } = useContext(AppContext);

    return (
        <div className={styles.item}>
            <Link href={`/breeds/${id}`}>
                <div className={styles.white_bg}>
                    <div
                        className={styles.img}
                        style={{ backgroundImage: `url("${image?.url}")` }}
                    ></div>
                    {
                        // <img src={image.url} />
                    }
                </div>
            </Link>
            <div
                className={styles.bottom}
                onClick={() => {
                    isFavourite
                        ? removeToFavourites(favourite_id)
                        : addToFavourites(id);
                }}
            >
                <h3>{name}</h3>
                <svg
                    className={isFavourite ? `${styles.liked}` : ``}
                    viewBox="0 0 24 24"
                >
                    <path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z" />
                </svg>
            </div>
        </div>
    );
};

export default Item;
