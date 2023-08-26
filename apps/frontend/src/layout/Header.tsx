import React from "react";
import './header.css'

export function Header(){
    return (
        <header>
            <h1>Ogłoszenie</h1>

            <button>Dodaj ogłoszenie</button>

            <div className="search">

                <input type="text"/>
                <button>Szukaj</button>

            </div>
        </header>
    )
}