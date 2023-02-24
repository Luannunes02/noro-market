import React from "react";
import styles from "../../styles/RemoveBtn.module.scss"

interface Button {
    text: string;
    action: any;
}

export default function RemoveBtn(props: Button) {
    return (
        <button onClick={props.action} className={`${styles.removeBtnComponent}`}>
            {props.text}
        </button>
    )
}