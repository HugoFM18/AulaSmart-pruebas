import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

// Páginas reales
import Alertas from '../pages/Alertas';
import Historial from '../pages/Historial';

// Placeholder temporal Dashboard
const DashboardPlaceholder = () => (
  <div className="view-header">
    <h2>Monitoreo en Tiempo Real</h2>

    <p>
      Visualización de sensores analógicos y digitales
      distribuidos en la institución.
    </p>
  </div>
);

// Placeholder temporal Dispositivos
const DispositivosPlaceholder = () => (
  <div className="view-header">
    <h2>Hardware e Infraestructura IoT</h2>

    <p>
      Verificación de integridad de los dispositivos
      físicos y llaves criptográficas.
    </p>
  </div>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<DashboardPlaceholder />}
          />

          <Route
            path="alertas"
            element={<Alertas />}
          />

          <Route
            path="dispositivos"
            element={<DispositivosPlaceholder />}
          />

          <Route
            path="historial"
            element={<Historial />}
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;