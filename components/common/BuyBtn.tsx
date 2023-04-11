import React from "react";
import styles from "../../styles/BuyBnt.module.scss"

interface Button {
    text: string;
    action: any;
    class?: string;
}

export default function BuyBtn(props: Button) {
    return (
        <button className={`${styles.btn} ${props.class}`} onClick={props.action}>
            {props.text}
        </button>
    )
}