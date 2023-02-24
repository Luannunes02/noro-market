import Navbar from './Navbar'
import Footer from './Footer'

import styles from '../styles/Layout.module.scss'

export default function Layout({children}:any) {
    return (
        <>
            <Navbar/>
            <main className={styles.main_layout}>
                {children}
            </main>
            <Footer/>
        </>
    )
}