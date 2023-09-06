import React, {useState} from "react";
import {Header} from "../layout/Header";
import { SearchContext } from "../context/SearchContext";
import {Map} from "../components/Map/Map";

export function MainMap() {
    const [search, setSearch] = useState('')
    return (
        <>
            <SearchContext.Provider value={{search, setSearch}}>
                <Header/>
                <Map/>
            </SearchContext.Provider>
        </>
    );
}