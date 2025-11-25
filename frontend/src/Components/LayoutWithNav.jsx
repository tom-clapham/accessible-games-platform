import { Outlet } from "react-router-dom";
import { useEffect } from 'react';
import Navbar from "../Components/Navbar/Navbar"
import styles from './Layout.module.css';

function LayoutWithNav() {
  useEffect(() => {
    const nav = document.querySelector(`.${styles.navbar}`);
    if (nav) {
      document.documentElement.style.setProperty(
        "--navbar-height",
        nav.offsetHeight + "px"
      );
    }
  }, [])

  return (
    <>
    <div className={styles.navbar}>
      <Navbar />
    </div>
    <main className={styles.container}>
      <Outlet />
    </main>
    </>
  );
}

export default LayoutWithNav;