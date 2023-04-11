import React, { useEffect, useState } from "react";
import styles from "../styles/Cart.module.scss";
import { toast } from "react-toastify";

import CartProduct from "../components/CartProduct";
import BuyBtn from "../components/common/BuyBtn";
import RemoveBtn from "../components/common/RemoveBtn";

import Api from "../pages/api/products.json";
const apiProducts: any = Api.Products;

import {
  updateCart,
  updateBought,
  updateFreightBuy,
  updateDeleteCartBought,
  updateBuyTotalValue,
} from "../store/slices/localizationSlice";
import { store } from "../store";
import { useSelector, useDispatch } from "react-redux";

export default function Cart() {
  const buyTotalValueSelector = useSelector(
    (state: any) => state.buyTotalValue
  );
  const cartSelector = useSelector((state: any) => state.cart);
  const boughtSelector = useSelector((state: any) => state.bought);
  const FreightInitialSelector = useSelector(
    (state: any) => state.freightInitialCep
  );
  const freightBuySelector = useSelector((state: any) => state.freightBuy);
  const cepSelector = useSelector((state: any) => state.cep);
  const dispatch = useDispatch();

  const [haveProductInTheCart, setHaveProductInTheCart] = useState(false);
  const [putAdress, setPutAdress] = useState(false);

  function handleWriteDataForBuy() {
    setPutAdress(true);
  }

  function buyAction() {
    const $nomeInput = document.getElementById("nome") as HTMLInputElement;
    const $enderecoInput = document.getElementById(
      "endereco"
    ) as HTMLInputElement;
    const $radioContainer = document.getElementById(
      "radioContainer"
    ) as HTMLInputElement;
    const radioContainer = document.getElementById("radioContainer") as any;
    const radios = radioContainer.querySelectorAll('input[type="radio"]');
    const $emailInput = document.getElementById("email") as HTMLInputElement;

    let selectedValue;

    radios.forEach((radio: any) => {
      if (radio.checked) {
        selectedValue = radio.value;
      }
    });

    if (
      $nomeInput.value === "" ||
      $enderecoInput.value === "" ||
      $emailInput.value === "" ||
      selectedValue === "" ||
      selectedValue === undefined
    ) {
      toast.warn("Preencha todos os dados da compra!", {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return;
    }

    dispatch(updateBought(cartSelector));
    dispatch(updateDeleteCartBought());
    setHaveProductInTheCart(false);

    toast.success(
      `Itens comprados com sucesso!       
      Foram enviados os dados de pagamento para o e-mail ${
        $emailInput.value
      }`,
      {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  }

  useEffect(() => {
    if (cartSelector.length === 0) {
      return;
    }

    let buyQuant = 0;
    let buyTotalValue = 0;

    for (let i = 0; i < cartSelector.length; i++) {
      buyQuant += parseFloat(cartSelector[i].buyQuant);
      let buyProduct = parseFloat(cartSelector[i].buyQuant);
      buyTotalValue +=
        parseFloat(apiProducts[cartSelector[i].productId].value) * buyProduct;
    }

    if (cartSelector.length > 0) {
      dispatch(
        updateFreightBuy(
          (FreightInitialSelector + buyQuant).toString().replace(".", ",")
        )
      );
      //atenção aqui
      if (freightBuySelector !== undefined) {
        const totalValue =
          buyTotalValue + parseFloat(freightBuySelector.replace(",", "."));
        dispatch(updateBuyTotalValue(totalValue.toString().replace(".", ",")));
      }

      setHaveProductInTheCart(true);
    } else {
      setHaveProductInTheCart(false);
    }
  }, [cartSelector, freightBuySelector]);

  if (cartSelector === 0) {
    setHaveProductInTheCart(false);
  }

  return (
    <div className={`container ${styles.cartContainer}`}>
      <h1 className={`pt-5 ${styles.title}`}>Carrinho</h1>
      {!haveProductInTheCart ? (
        <div>
          <p>Seu carrinho está vazio :(</p>
        </div>
      ) : (
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
              );
            })}
          </div>
          <div className="mt-3">
            <p>
              Obs: o valor do frete para sua região sobe 1 real a cada produto.
            </p>
            <div>
              <p>
                O Frete para o CEP de {cepSelector.cep}, {cepSelector.bairro} -{" "}
                {cepSelector.uf} é de {freightBuySelector} R$
              </p>
            </div>
            <p>TOTAL = {buyTotalValueSelector} R$</p>
          </div>
          {!putAdress ? (
            <div>
              <BuyBtn text="PAGAMENTO" action={handleWriteDataForBuy} />
            </div>
          ) : (
            <div className={`container ${styles.dataForBuyContainer}`}>
              <h1 className="text-center mt-3">Dados para pagamento</h1>
              <div className={`${styles.inputbox} mt-4`}>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  autoComplete="off"
                  required
                />
                <span>Nome completo</span>
                <i></i>
              </div>

              <div className={`${styles.inputbox} mt-4`}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  required
                />
                <span>Email</span>
                <i></i>
              </div>

              <div className={`${styles.inputbox} mt-3`}>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  autoComplete="off"
                  required
                />
                <span>Endereço</span>
                <i></i>
              </div>

              <div className={`${styles.inputboxChecked} mt-3`}>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  value={cepSelector.cep}
                  required
                  readOnly
                />
                <span>CEP</span>
                <i></i>
              </div>

              <div className={`${styles.inputboxChecked} mt-3`}>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={cepSelector.localidade + " - " + cepSelector.uf}
                  required
                  readOnly
                />
                <span>Cidade e Estado</span>
                <i></i>
              </div>

              <div className={`${styles.inputboxChecked} mt-3`}>
                <input
                  type="text"
                  id="bairro"
                  name="bairro"
                  value={cepSelector.bairro}
                  required
                  readOnly
                />
                <span>Bairro</span>
                <i></i>
              </div>

              <div className={`mt-3`} id="radioContainer">
                <label>Condição de pagamento:</label>
                <div>
                  <input
                    type="radio"
                    id="cartao"
                    name="pagamento"
                    value="cartao"
                    required
                  />
                  <label htmlFor="cartao"> Cartão de crédito</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="boleto"
                    name="pagamento"
                    value="boleto"
                    required
                  />
                  <label htmlFor="boleto"> Boleto bancário</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="pix"
                    name="pagamento"
                    value="pix"
                    required
                  />
                  <label htmlFor="pix"> Pix</label>
                </div>
              </div>
              <BuyBtn text="COMPRAR" class="mb-5 mt-3" action={buyAction} />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
