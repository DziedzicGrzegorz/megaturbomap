import React, {useEffect, useState} from "react";
import {AdEntity} from "types";

interface Props {
    id: string;
}

export function SingleAdv(props: Props) {
    const [ad, setAd] = useState<AdEntity | null>(null);

    async function getAd() {
        const res = await fetch(`http://localhost:3000/ad/${props.id}`);
        const data = await res.json() as {
            ad: AdEntity
        };

        setAd(data.ad);
    }

    useEffect(() => {
        getAd()

    }, []);


    if (ad === null) {
        console.log('nullable')
        return <p>Loading...</p>
    }

    return (
        <div className="singleAdv">

            <p>test</p>
            <h2>{ad.name}</h2>
            <p>{ad.description}</p>
            {Boolean(Number(ad.price)) && <p>{ad.price} zł</p>}
            <a href={ad.url} target={"_blank"}>
                Open in new tab
            </a>
        </div>

    )
}

