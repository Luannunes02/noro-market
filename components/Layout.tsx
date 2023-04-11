import Navbar from './Navbar'
import Footer from './Footer'

import styles from '../styles/Layout.module.scss'
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

export default function Layout({ children }: any) {
    return (
        <>
            <Navbar />
            <main className={styles.main_layout}>
                {children}
            </main>
            <Footer />
        </>
    )
}