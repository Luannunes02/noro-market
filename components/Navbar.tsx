import styles from '../styles/Navbar.module.scss'
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className={`navbar navbar-expand-lg ${styles.navbarContainer}`}  id='navbarContainer'>
            <div className="container-fluid">
                <Link className={`navbar-brand ${styles.title}`} href="/">Noro Market</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className={`nav-item ${styles.li}`}>
                            <Link className={`nav-link ms-4 ${styles.navbarLink}`} aria-current="page" href="/">Home</Link>
                        </li>                        
                        <li className={`nav-item ${styles.li}`}>
                            <Link className={`nav-link ${styles.navbarLink}`} href="/cart">Carrinho</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className={`form-control me-2 ${styles.search}`}type="search" placeholder="Search" aria-label="Search" />
                        <button className={`${styles.btnSearch}`} type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}