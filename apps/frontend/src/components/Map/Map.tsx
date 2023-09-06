import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import './Map.css'
import 'leaflet/dist/leaflet.css'
import './iconFix'
import {SearchContext} from "../../context/SearchContext";
import {SimpleAdEntity} from "types";
import {useContext, useEffect, useState} from "react";
import React from 'react';
import {SingleAdv} from "./SingleAdv/SingleAdv";

export function Map() {
    const {search} = useContext(SearchContext);
    const [ads, setAds] = useState<SimpleAdEntity[]>([])

    async function getSearch() {
        const res = await fetch(`http://localhost:3000/ad/search/${search}`)
        const data = await res.json() as {
            ads: SimpleAdEntity[]
        };
        setAds(data.ads);
    }

    useEffect(() => {
        getSearch();
    }, [search]);

    return (
        <div className="map">
            <h1>Search for {search}</h1>
            <MapContainer center={[51.9412722, 15.5007792]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=\'https://www.openstreetmap.org/\'>OpenStreetMap</a> contributors"
                />

                {
                    ads.map((ad) => {
                            return (
                                <Marker key={ad.id} position={[ad.lat, ad.lon]}>
                                    <Popup>
                                        <SingleAdv id={ad.id}/>
                                    </Popup>
                                </Marker>
                            )
                        }
                    )
                }
            </MapContainer>

        </div>
    )
}