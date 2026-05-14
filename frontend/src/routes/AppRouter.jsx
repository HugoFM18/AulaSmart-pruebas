import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Alertas from "../pages/Alertas";
import Dispositivos from "../pages/Dispositivos";
import Sensores from "../pages/Sensores";
import Usuarios from "../pages/Usuarios";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/dispositivos" element={<Dispositivos />} />
        <Route path="/sensores" element={<Sensores />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;