import React, {useState} from "react";
import {Header} from "../../layout/Header";
import {Map} from "../../components/Map/Map";
import {SearchContext} from "../../context/SearchContext";

export function Main() {
    const [search, setSearch] = useState('')
    return (
        <>
            <SearchContext.Provider value={{search, setSearch}}>
                <Header/>
                <Map/>
            </SearchContext.Provider>
        </>
    )
}