import React from 'react';
import styles from '../../styles/Card.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
    pName: any;
    value: number;
    description: string;
    photo: string;
    id: number;
}

export default function Card(props: Product) {
    return (
        <Link href={`/products/${props.id}`} className='text-decoration-none'>
            <div className={`${styles.card} mt-4 me-1`}>
            <div className={`${styles.cardContainer}`}>
                <p className={`${styles.title}`}>{props.pName} 10KG</p>
                <Image
                    className={`${styles.image}`}
                    src={props.photo}
                    alt={props.pName}
                    width={350}
                    height={400}
                />
                <p className={`${styles.description}`} >{props.description}</p>
                <div className={`d-flex `}>
                    <p className={`${styles.value}`}>{props.value.toFixed(2)} R$</p>
                    <button className={`${styles.btn}`}>
                        <span className={`${styles.btnSpan}`}>
                            DETALHES
                        </span>
                    </button>
                </div>
            </div>
        </div>
        </Link>        
    )
}