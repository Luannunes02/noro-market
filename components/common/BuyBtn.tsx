import React from "react";
import styles from "../../styles/BuyBnt.module.scss"

interface Button {
    text: string;
    action: any;
}

export default function BuyBtn(props: Button) {
    return (
        <button className={`${styles.btn}`} onClick={props.action}>
            {props.text}
        </button>
    )
}