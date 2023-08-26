import React from "react";
import './Map.css'
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
export function Map() {
    return (
        <div className="map">
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