import React from "react";

interface BtnProps {
    text: string;
}

export function Btn(props:BtnProps) {
    return (
        <button>
            {props.text}
        </button>
    )
}