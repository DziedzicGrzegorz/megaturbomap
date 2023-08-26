import React from "react";
import './header.css'
import {Btn} from "../common/Btn/Btn";

export function Header() {
    return (
        <header>
            <h1>Ogłoszenie</h1>

            <Btn text={"Dodaj ogłoszenie"}/>

            <div className="search">

                <input type="text"/>
                <Btn text={"Szukaj"}/>

            </div>
        </header>
    )
}