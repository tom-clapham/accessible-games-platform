import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import styles from './Layout.module.css';

function LayoutWithNav() {
  return (
    <div className={styles.container}>
      <div>
        <Navbar />
      </div>
      <main className={styles.outlet}>
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutWithNav;