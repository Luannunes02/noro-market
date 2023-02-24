import React, { useEffect, useState } from "react";
import styles from "../styles/Cart.module.scss";
import { toast } from 'react-toastify';

import CartProduct from "../components/CartProduct";
import BuyBtn from "../components/common/BuyBtn";
import RemoveBtn from "../components/common/RemoveBtn";

import Api from '../pages/api/products.json';
const apiProducts: any = Api.Products;

import { updateCart, updateBought, updateFreightBuy, updateDeleteCartBought,updateBuyTotalValue } from '../store/slices/localizationSlice'
import { store } from '../store';
import { useSelector, useDispatch } from 'react-redux';

export default function Cart() {
    const buyTotalValueSelector = useSelector((state: any) => state.buyTotalValue);
    const cartSelector = useSelector((state: any) => state.cart);
    const boughtSelector = useSelector((state: any) => state.bought);
    const FreightInitialSelector = useSelector((state: any) => state.freightInitialCep);
    const freightBuySelector = useSelector((state: any) => state.freightBuy);
    const cepSelector = useSelector((state: any) => state.cep);
    const dispatch = useDispatch();

    const [haveProductInTheCart, setHaveProductInTheCart] = useState(false);

    function buyAction() {        
        dispatch(updateBought(cartSelector));
        dispatch(updateDeleteCartBought());
        setHaveProductInTheCart(false);

        toast.success('Itens comprado com sucesso!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    useEffect(() => {
        if (cartSelector.length === 0) {
            return
        }

        let buyQuant = 0;
        let buyTotalValue = 0;

        for (let i = 0; i < cartSelector.length; i++) {
            buyQuant += parseFloat(cartSelector[i].buyQuant);
            let buyProduct = parseFloat(cartSelector[i].buyQuant)
            buyTotalValue += (parseFloat(apiProducts[cartSelector[i].productId].value) * buyProduct);
        }

        if (cartSelector.length > 0) {
            dispatch(updateFreightBuy((FreightInitialSelector + buyQuant).toString().replace(".", ",")));
            //atenção aqui
            if (freightBuySelector !== undefined) {
                const totalValue = buyTotalValue + parseFloat(freightBuySelector.replace(",", "."));
                dispatch(updateBuyTotalValue(totalValue.toString().replace(".", ",")));
            }

            setHaveProductInTheCart(true);
        } else {
            setHaveProductInTheCart(false);
        }
    }, [cartSelector, freightBuySelector])

    if (cartSelector === 0) {
        setHaveProductInTheCart(false);
    }

    return (
        <div className={`container ${styles.cartContainer}`}>
            <h1 className={`pt-5 ${styles.title}`}>Carrinho</h1>
            {!haveProductInTheCart ?
                <div>
                    <p>Seu carrinho está vazio :(</p>
                </div>
                :
                <section>
                    <div>
                        {cartSelector.map((product: any) => {
                            const productShow = apiProducts[product.productId];
                            return (
                                <CartProduct
                                    variableController={setHaveProductInTheCart}
                                    key={product.productId}
                                    buyQuantity={product.buyQuant}
                                    freightValue={product.freight}
                                    productId={product.productId}
                                    pName={productShow.name}
                                    value={productShow.value}
                                    photo={productShow.capa}
                                />
                            )
                        })}
                    </div>
                    <div>
                        <p>Obs: o valor do frete para sua região sobe 1 real a cada produto.</p>
                        <div>
                            <p>O Frete para o CEP de {cepSelector.cep}, {cepSelector.bairro} - {cepSelector.uf} é de {freightBuySelector} R$</p>
                        </div>
                    </div>
                    <div>
                        <p>TOTAL = {buyTotalValueSelector}</p>
                        <BuyBtn text="Comprar" action={buyAction} />
                    </div>
                </section>
            }
        </div>
    )
}