import { useEffect, useState } from "react";

import SensorCard from "../components/cards/SensorCard";

import TemperatureChart from "../components/charts/TemperatureChart";
import HumidityChart from "../components/charts/HumidityChart";
import SoundChart from "../components/charts/SoundChart";
import LightChart from "../components/charts/LightChart";

import AulaStatus from "../components/status/AulaStatus";

import { getHistorial } from "../services/historialService";

import "./Dashboard.css";

const Dashboard = () => {

  const [historial, setHistorial] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const response = await getHistorial();

      setHistorial(
        response.historial || []
      );

      setStats(
        response.estadisticas || {}
      );

    } catch (error) {

      console.error(
        "Error cargando dashboard:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  const temperaturaData =
    historial.filter(
      (item) =>
        item.sensor === "temperatura"
    );

  const humedadData =
    historial.filter(
      (item) =>
        item.sensor === "humedad"
    );

  const sonidoData =
    historial.filter(
      (item) =>
        item.sensor === "sonido"
    );

  const luzData =
    historial.filter(
      (item) =>
        item.sensor === "luz"
    );

  return (

    <div className="dashboard-page">

      <div className="page-header">

        <h1>
          Dashboard Inteligente
        </h1>

        <p>
          Monitoreo ambiental en tiempo real.
        </p>

      </div>

      <AulaStatus stats={stats} />

      {/* KPI CARDS */}

      <div className="sensor-grid">

        <SensorCard
          title="Temperatura"
          value={
            stats.promedios.toFixed(2)
              ?.temperatura || "--"
          }
          unit="°C"
          type="temperature"
        />

        <SensorCard
          title="Humedad"
          value={
            stats.promedios.toFixed(2)
              ?.humedad || "--"
          }
          unit="%"
          type="humidity"
        />

        <SensorCard
          title="Ruido"
          value={
            stats.promedios.toFixed(2)
              ?.sonido || "--"
          }
          unit="dB"
          type="sound"
        />

        <SensorCard
          title="Luz"
          value={
            stats.promedios.toFixed(2)
              ?.luz || "--"
          }
          unit="lx"
          type="light"
        />

      </div>

      {/* CHARTS */}

      {!loading && (

        <div className="charts-grid">

          <TemperatureChart
            data={temperaturaData}
            safeLimit={28}
            dangerLimit={35}
          />

          <HumidityChart
            data={humedadData}
            safeLimit={70}
            dangerLimit={85}
          />

          <SoundChart
            data={sonidoData}
            safeLimit={55}
            dangerLimit={70}
          />

          <LightChart
            data={luzData}
            safeLimit={80}
            dangerLimit={250}
          />

        </div>

      )}

    </div>
  );
};

export default Dashboard;