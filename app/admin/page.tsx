import Link from 'next/link'
import Header from '../components/header'
import DropdownBox from '../components/dropdownbox';
import styles from './page.module.css'
import "../styles/global.css"

export default function app() {
    return (
      <div>
      <Header />
        <div className={styles.pageContainer}>
        </div>
    </div>
    );
   }