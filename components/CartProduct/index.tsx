import React from "react";
import styles from "../../styles/CartProduct.module.scss";
import Image from "next/image";
import { toast } from 'react-toastify';

import { updateCart, updateBought, updateChangeCart, updateRemoveItemInCart } from '../../store/slices/localizationSlice'
import { store } from '../../store';
import { useSelector, useDispatch } from 'react-redux';

import Api from '../../pages/api/products.json';
const apiProducts: any = Api.Products;

import RemoveBtn from "../common/RemoveBtn";

interface Product {
    variableController: any;
    buyQuantity: number;
    freightValue: number;
    productId: number;
    pName: string;
    value: number;
    photo: string;
}


export default function CartProduct(props: Product) {
    const cartSelector = useSelector((state: any) => state.cart);
    const freightBuySelector = useSelector((state: any) => state.freightBuy);
    const boughtSelector = useSelector((state: any) => state.bought);
    const dispatch = useDispatch();

    function removeItem(id: number) {
        let index = 0;

        for(let i = 0; i < cartSelector.length ; i++) {
            if(cartSelector[i].productId === id) {
                index = i;
            }
        }

        dispatch(updateRemoveItemInCart(index));

        toast.success('Item excluido com sucesso!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        
        if(cartSelector.length === 1) {
            props.variableController(false);            
        }
    }

    function setBuyQuant(value: number, id: number) {
        let index = 0;

        if(value < 1) {
            toast.warn('Quantidade minima a se comprar de 1 unidade!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return
        }

        for(let i = 0; i < cartSelector.length ; i++) {
            if(cartSelector[i].productId === id) {
                index = i;
            }
        }

        const items = [value, index];
        dispatch(updateChangeCart(items));
    }

    return (
        <div className={`${styles.product} d-flex row mt-4`}>
            <div className="col col-xs-5 d-flex align-items-center">
                <Image
                    src={props.photo}
                    alt={props.pName}
                    width={100}
                    height={150}
                    className={``}
                />
                <div>
                    <p className="ms-3">{props.pName}</p>
                    <p className="ms-3">{props.value.toFixed(2)} R$</p>
                </div>
            </div>
            <div className="col col-xs-3">
                <input
                    type="number"
                    value={props.buyQuantity}
                    onChange={(e: any) => {
                        setBuyQuant(e.target.value, props.productId);
                    }}
                />
            </div>
            <div className="col col-xs-2">
                <RemoveBtn text="Remover" action={() => { removeItem(props.productId) }} />
            </div>
        </div>
    )
}