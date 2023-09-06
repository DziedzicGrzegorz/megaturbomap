import React from "react";
import {MainMap} from "./pages/MainMap";
import {Form} from "./pages/Form";
import {BrowserRouter, Route, Routes} from "react-router-dom";


export function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainMap/>}/>
                    <Route path="/form" element={<Form/>}/>
                </Routes>
            </BrowserRouter>
        </>

    )
}
