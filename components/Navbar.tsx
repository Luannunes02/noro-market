import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/Navbar.module.scss";

import { useRouter } from "next/router";

interface filter {
  home?: boolean;
  filterFunc?: any;
  teste?: Function;
}

export default function Navbar(props: filter) {
  const location = useRouter();

  return (
    <nav className={``} id="">
      <div className={`container-fluid ${styles.container}`}>
        <Link className={`${styles.logo}`} href="/">
          Noro Market
        </Link>
        <ul className="">
          <li className={``}>
            <Link className={`${styles.item}`} aria-current="page" href="/">
              Home
            </Link>
          </li>
          <li className={``}>
            <Link className={`${styles.item}`} href="/cart">
              Carrinho
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
