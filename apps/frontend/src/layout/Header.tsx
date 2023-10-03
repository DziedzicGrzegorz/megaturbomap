import React, {SyntheticEvent, useContext, useState} from "react";
import './Header.css'
import {Btn} from "../common/Btn/Btn";
import {SearchContext} from "../context/SearchContext";
import {Link} from "react-router-dom";

export function Header() {
    const {search, setSearch} = useContext(SearchContext)
    const [inputValue, setInputValue] = useState(search)

    return (
        <header>
            <h1>Ogłoszenie</h1>

            <Link to="/form">
                <Btn text={"Dodaj ogłoszenie"} />
            </Link>

            <div className="search">
                <form className="headerForm" onSubmit={(e:SyntheticEvent) => {
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