import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar"

function LayoutWithNav() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default LayoutWithNav;