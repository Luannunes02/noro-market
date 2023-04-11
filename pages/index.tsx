import { useState } from 'react'
import styles from '../styles/Home.module.scss'

import Api from './api/products.json'
import Card from '../components/Card'

export default function Home() {
  const [api, setApi] = useState(Api.Products);
  const allProducts = Api.Products;

  function handleFilterProducts() {  
    const $searchInput = document.getElementById('search') as HTMLInputElement;

    if($searchInput.value === "") {
      setApi(allProducts);
    }

    let filterProducts = allProducts.filter((item) => {
      return item.name.toLowerCase().includes($searchInput.value.toLowerCase());
    });
    
    setApi(filterProducts);
    $searchInput.value = "";
  }


  return (
    <div className={`container-fluid gx-0 pb-5`}>
      <div className={`${styles.searchContainer} container`}>
        <div>
          <label htmlFor="search" className="text-light">
            Localize seu produto:
          </label>
          <input type="text" id="search" name="search" autoComplete="off" />
          <button onClick={handleFilterProducts}>Pesquisar</button>
        </div>
      </div>
      <section className={`${styles.container} container`}>
        {api.map((product: any) => {
          return (
            <Card
              key={product.id}
              pName={product.name}
              value={product.value}
              description={product.descricao}
              photo={product.capa}
              id={product.id}
            />
          );
        })}
      </section>
    </div>
  );
}
