import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

import "./MainLayout.css";

function MainLayout() {

  return (

    <div className="layout-container">

      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="main-content">

        {/* Navbar */}
        <Navbar />

        {/* Páginas dinámicas */}
        <div className="page-content">

          <Outlet />

        </div>

      </div>

    </div>
  );
}

export default MainLayout;