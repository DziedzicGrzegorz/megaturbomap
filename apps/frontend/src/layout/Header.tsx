import React, {SyntheticEvent, useContext, useState} from "react";
import './header.css'
import {Btn} from "../common/Btn/Btn";
import {SearchContext} from "../context/SearchContext";

export function Header() {
    const {search, setSearch} = useContext(SearchContext)
    const [inputValue, setInputValue] = useState(search)

    return (
        <header>
            <h1>Ogłoszenie</h1>

            <Btn text={"Dodaj ogłoszenie"}/>

            <div className="search">
                <form onSubmit={(e:SyntheticEvent) => {
                    e.preventDefault()
                    setSearch(inputValue)
                }}>
                    <input type="text" value={inputValue} onChange={
                        (e) => {
                            setInputValue(e.target.value)
                        }
                    }
                    />
                </form>
                <Btn text={"Szukaj"}/>

            </div>
        </header>
    )
}