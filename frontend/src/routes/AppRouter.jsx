import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Alertas from "../pages/Alertas";
import Dispositivos from "../pages/Dispositivos";
import Sensores from "../pages/Sensores";
import Usuarios from "../pages/Usuarios";

function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Layout principal */}
        <Route element={<MainLayout />}>

          {/* Redirección inicial */}
          <Route
            path="/"
            element={<Navigate to="/dashboard" />}
          />

          {/* Rutas */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/alertas"
            element={<Alertas />}
          />

          <Route
            path="/dispositivos"
            element={<Dispositivos />}
          />

          <Route
            path="/sensores"
            element={<Sensores />}
          />

          <Route
            path="/usuarios"
            element={<Usuarios />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;