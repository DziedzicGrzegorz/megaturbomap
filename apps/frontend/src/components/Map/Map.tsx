import React, {useContext, useEffect} from "react";
import './Map.css'
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {SearchContext} from "../../context/SearchContext";
export function Map() {
    const {search} = useContext(SearchContext);

    useEffect(() => {
        console.log(search)
    }, [search])

    return (
        <div className="map">
            <h1>Search for {search}</h1>
            <MapContainer center={[51.9412722,15.5007792]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=\'https://www.openstreetmap.org/\'>OpenStreetMap</a> contributors"
                />
                <Marker position={[51.9412722,15.5007792]}>

                </Marker>
            </MapContainer>

        </div>
    )
}