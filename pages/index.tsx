import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import styles from '../styles/Home.module.scss'

import Api from './api/products.json'
const api: any = Api.Products;
import Card from '../components/Card'

export default function Home() {
  return (
    <div className={`container-fluid`}>
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
          )
        })}
      </section>
    </div>
  )
}
