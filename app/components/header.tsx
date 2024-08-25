// "use client";

import Link from 'next/link';
import styles from './Header.module.css';
// import {useState} from 'react';
 
export default function Header() {
    return (
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Science Olympiad</h1>
          <p className={styles.subtitle}>Exploring the world of science</p>
        </div>
        <nav className={styles.nav}>
        <Link href="/tournament" className={styles.navLink}>
          <div className={styles.dropdown}>
            Tournament
            <div className={styles.dropdownContent}>
              <a href="#">Create Tournament</a>
              <a href="#">Manage Tournament</a>
              <a href="#">Score</a>
            </div>
          </div>
        </Link>
          <Link href="/attendance" className={styles.navLink}>Attendance</Link>
          <div className={styles.separator} />
          <Link href="/account" className={styles.navLink}>Account</Link>
        </nav>
      </header>
    );
  }