import React from "react";
import {Link} from "react-router-dom";
import './Btn.css'

interface BtnProps {
    text: string;
    to?: string;
}

export function Btn(props: BtnProps) {

    return (
        props.to
            ? <Link className="btn" to={props.to}>{props.text}</Link>
            : <button>{props.text}</button>
    )
}