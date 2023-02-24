import Link from 'next/link';
import Image from 'next/image';
import React, { HTMLAttributeAnchorTarget, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import styles from "../../styles/ProductId.module.scss";

import { useSelector, useDispatch } from 'react-redux';
import { updateCep, updateCart, updateMessageCep, updateFreightForCep } from '../../store/slices/localizationSlice'
import { store } from '../../store';

import Api from '../../pages/api/products.json';
const apiProducts: any = Api.Products;

export default function Product() {

    const dispatch = useDispatch();
    const cepSelector = useSelector((state: any) => state.cep);
    const cartSelector = useSelector((state: any) => state.cart);
    const MessageCepSelector = useSelector((state: any) => state.messageCep);


    const router = useRouter();
    const productId: any = router.query.productId;
    const product = apiProducts[productId];

    const [loadProduct, setLoadProduct] = useState(false);

    const [buyQuant, setBuyQuant] = useState(1);

    const [cep, setCep] = useState<any>();
    const [cepValue, setCepValue] = useState<any>();
    const [messageCep, setMessageCep] = useState<any>();
    const [cepInput, setCepInput] = useState("")

    useEffect(() => {
        if (!product) {
            return
        }
        setLoadProduct(true);
    }, [product])

    useEffect(() => {
        setMessageCep(MessageCepSelector);
    }, [])

    function verifyInputCepMaxLength(e: any) {
        if (e.length > 8) {
            toast.warn('CEP máximo de 8 dígitos!', {
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
        setCepInput(e);
    }

    useEffect(() => {
        if (cep === undefined) {
            return
        }

        function makeMessage() {
            switch (cep.uf) {
                case "DF":
                    setMessageCep(`O Frete para região de ${cep.localidade} - ${cep.uf} é grátis`);
                    setCepValue(0);
                    dispatch(updateMessageCep(`O Frete para região de ${cep.localidade} - ${cep.uf} é grátis`))
                    break;
                case "SP":
                    setMessageCep(`O Frete para região do ${cep.localidade} - ${cep.uf} é de 15,98`);
                    dispatch(updateMessageCep(`O Frete para região de ${cep.localidade} - ${cep.uf} é de 15,98`))
                    setCepValue(15.98);
                    break;
                case "AP":
                    setMessageCep(`O Frete para região do ${cep.localidade} - ${cep.uf} é de 21,32`);
                    dispatch(updateMessageCep(`O Frete para região de ${cep.localidade} - ${cep.uf} é de 21,32`))
                    setCepValue(21.32);
                    break;
                case "RR":
                    setMessageCep(`O Frete para região do ${cep.localidade} - ${cep.uf} é de 25,32`);
                    dispatch(updateMessageCep(`O Frete para região de ${cep.localidade} - ${cep.uf} é de 25,32`))
                    setCepValue(25.32);
                    break;
                case "TO":
                    setMessageCep(`O Frete para região do ${cep.localidade} - ${cep.uf} é de 32,00`);
                    dispatch(updateMessageCep(`O Frete para região de ${cep.localidade} - ${cep.uf} é de 32,00`))
                    setCepValue(32.00);
                    break;
                case "MA":
                    setMessageCep(`O Frete para região do ${cep.localidade} - ${cep.uf} é de 28,51`);
                    dispatch(updateMessageCep(`O Frete para região de ${cep.localidade} - ${cep.uf} é de 28,51`))
                    setCepValue(28.51);
                    break;
                case "PI":
                    setMessageCep(`O Frete para região do ${cep.localidade} - ${cep.uf} é de 33,27`);
                    dispatch(updateMessageCep(`O Frete para região de ${cep.localidade} - ${cep.uf} é de 33,27`))
                    setCepValue(33.27);
                    break;
                case "CE":
                    setMessageCep(`O Frete para região do ${cep.localidade} - ${cep.uf} é de 54,11`);
                    dispatch(updateMessageCep(`O Frete para região de ${cep.localidade} - ${cep.uf} é de 54,11`))
                    setCepValue(54.11);
                    break;
                case "RJ":
                    setMessageCep(`O Frete para região do ${cep.localidade} - ${cep.uf} é de 26,14`);
                    dispatch(updateMessageCep(`O Frete para região de ${cep.localidade} - ${cep.uf} é de 26,14`))
                    setCepValue(26.14);
                    break;
                default:
                    setMessageCep(`O Frete para região do ${cep.localidade} - ${cep.uf} é de 41,28`);
                    dispatch(updateMessageCep(`O Frete para região de ${cep.localidade} - ${cep.uf} é de 41,28`))
                    setCepValue(41.28);
                    break;
            }
        }

        makeMessage();
    }, [cep])



    async function handleSearchCep() {
        if (cepInput.length < 8) {
            toast.warn('CEP tem que ter 8 dígitos!', {
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

        await axios
            .get(`https://viacep.com.br/ws/${cepInput}/json/`)
            .then(res => {
                dispatch(updateCep(res.data))
                setCep(res.data)
            })

        setCepInput('');
    }

    function handleBuyBtn() {

        if (cepSelector === undefined) {
            toast.warn('Coloque o seu CEP para calcúlarmos o frete antes de comprar!', {
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

        const hasTheSameProductIntheCart = cartSelector.some((product: any) => product.productId === productId);

        if (hasTheSameProductIntheCart) {
            toast.warn('Esse produto já está no carrinho!')
            return;
        }


        const cartProduct: Object = {
            productId: productId,
            buyQuant: buyQuant,
        }
        if (cepValue || cepValue === 0) {
            dispatch(updateFreightForCep(cepValue));
        }

        dispatch(updateCart(cartProduct));
        toast.success('Produto adicionado no carrinho com sucesso!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        setBuyQuant(1)
    }

    function verifyBuyQuant(value: any) {
        if (value < 1) {
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
        setBuyQuant(value)
    }

    return (
        <section className={`${styles.container} container`}>
            {!loadProduct
                ?
                (<p>Carregando...</p>)
                :
                (
                    <div>
                        <div className={`d-flex justify-content-center ${styles.titleContainer}`}>
                            <h1 className='mt-5 display-3'>{product.name} 10KG</h1>
                        </div>
                        <div className={`${styles.productContainer} row mt-5`}>
                            <div className={`col col-lg-4`}>
                                <Image
                                    src={product.capa}
                                    alt={product.name}
                                    width={400}
                                    height={600}
                                />
                            </div>
                            <div className={`col col-lg-8`}>
                                <div className={`${styles.descriptionContainer}`}>
                                    <p className='display-6'>
                                        Descrição:
                                    </p>
                                    <h6 className='fs-3'>
                                        {product.descricao}
                                    </h6>
                                </div>

                                <div className={`${styles.calcFreightContainer} mt-4`}>
                                    {cepSelector === undefined ?
                                        <div className={`mt-4`}>
                                            <input type='number' value={cepInput} onChange={(e: any) => verifyInputCepMaxLength(e.target.value)} id='cepInput' />
                                            <button className={` `} onClick={handleSearchCep}>Calcúlar frete</button>
                                        </div>
                                        :
                                        <div></div>
                                    }

                                    {cepSelector !== undefined ? <p className='mt-4'>{messageCep}</p>
                                        :
                                        <span></span>
                                    }
                                </div>
                                <div className={`${styles.buyContainer} mt-4`}>
                                    <input type='number'
                                        value={buyQuant}
                                        onChange={(e: any) => (
                                            verifyBuyQuant(e.target.value)
                                        )}
                                        pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
                                    />
                                    <button onClick={handleBuyBtn}>Adicionar no carrinho</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </section>
    )
}