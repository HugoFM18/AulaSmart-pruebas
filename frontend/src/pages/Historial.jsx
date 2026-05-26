import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import { getHistorial } from "../services/historialService";

import "./Historial.css";

const Historial = () => {

  const [historial, setHistorial] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistorial();
  }, []);

  const fetchHistorial = async () => {

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
        "Error obteniendo historial:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  // =========================================
  // FORMATEAR FECHA
  // =========================================

  const formatFecha = (fecha) => {

    return new Date(fecha).toLocaleString(
      "es-CO",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );
  };

  // =========================================
  // FORMATEAR VALORES
  // =========================================

  const formatValor = (valor) => {

    if (
      valor === null ||
      valor === undefined
    ) {
      return "--";
    }

    return Number(valor).toFixed(2);
  };

  // =========================================
  // FILTROS
  // =========================================

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

  const ruidoData =
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

    <div className="historial-page">

      <div className="page-header">

        <h1>
          Historial Ambiental
        </h1>

        <p>
          Monitoreo histórico y análisis estadístico.
        </p>

      </div>

      {/* KPIs */}

      <div className="stats-grid">

        <div className="stat-card">

          <h3>Temperatura</h3>

          <p>
            {
              formatValor(
                stats.promedios?.temperatura
              )
            } °C
          </p>

        </div>

        <div className="stat-card">

          <h3>Humedad</h3>

          <p>
            {
              formatValor(
                stats.promedios?.humedad
              )
            } %
          </p>

        </div>

        <div className="stat-card">

          <h3>Ruido</h3>

          <p>
            {
              formatValor(
                stats.promedios?.sonido
              )
            } dB
          </p>

        </div>

        <div className="stat-card">

          <h3>Luz</h3>

          <p>
            {
              formatValor(
                stats.promedios?.luz
              )
            } lx
          </p>

        </div>

      </div>

      {/* TABLA */}

      {!loading && (

        <div className="table-container">

          <table className="historial-table">

            <thead>

              <tr>
                <th>Sensor</th>
                <th>Valor</th>
                <th>Unidad</th>
                <th>Fecha</th>
              </tr>

            </thead>

            <tbody>

              {historial.map((item) => (

                <tr key={item.id}>

                  <td>
                    {item.sensor}
                  </td>

                  <td>
                    {
                      formatValor(
                        item.valor
                      )
                    }
                  </td>

                  <td>
                    {item.unidad}
                  </td>

                  <td>
                    {
                      formatFecha(
                        item.fecha
                      )
                    }
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      {/* GRAFICAS */}

      <div className="charts-grid">

        {/* TEMPERATURA */}

        <div className="chart-container">

          <h2>Temperatura</h2>

          <ResponsiveContainer
            width="100%"
            height={250}
          >

            <LineChart
              data={temperaturaData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="fecha"
                tickFormatter={(value) =>
                  new Date(value)
                  .toLocaleTimeString(
                    "es-CO",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                }
              />

              <YAxis
                domain={[0, 45]}
              />

              <Tooltip
                formatter={(value) =>
                  [
                    Number(value)
                    .toFixed(2),
                    "Temperatura"
                  ]
                }
                labelFormatter={(label) =>
                  formatFecha(label)
                }
              />

              <ReferenceLine
                y={28}
                stroke="orange"
                strokeDasharray="5 5"
              />

              <ReferenceLine
                y={35}
                stroke="red"
                strokeDasharray="5 5"
              />

              <Line
                type="monotone"
                dataKey="valor"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* HUMEDAD */}

        <div className="chart-container">

          <h2>Humedad</h2>

          <ResponsiveContainer
            width="100%"
            height={250}
          >

            <LineChart
              data={humedadData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="fecha"
                tickFormatter={(value) =>
                  new Date(value)
                  .toLocaleTimeString(
                    "es-CO",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                }
              />

              <YAxis
                domain={[0, 100]}
              />

              <Tooltip
                formatter={(value) =>
                  [
                    Number(value)
                    .toFixed(2),
                    "Humedad"
                  ]
                }
                labelFormatter={(label) =>
                  formatFecha(label)
                }
              />

              <ReferenceLine
                y={70}
                stroke="orange"
                strokeDasharray="5 5"
              />

              <ReferenceLine
                y={85}
                stroke="red"
                strokeDasharray="5 5"
              />

              <Line
                type="monotone"
                dataKey="valor"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* SONIDO */}

        <div className="chart-container">

          <h2>Ruido</h2>

          <ResponsiveContainer
            width="100%"
            height={250}
          >

            <LineChart
              data={ruidoData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="fecha"
                tickFormatter={(value) =>
                  new Date(value)
                  .toLocaleTimeString(
                    "es-CO",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                }
              />

              <YAxis
                domain={[0, 80]}
              />

              <Tooltip
                formatter={(value) =>
                  [
                    Number(value)
                    .toFixed(2),
                    "Ruido"
                  ]
                }
                labelFormatter={(label) =>
                  formatFecha(label)
                }
              />

              <ReferenceLine
                y={55}
                stroke="orange"
                strokeDasharray="5 5"
              />

              <ReferenceLine
                y={70}
                stroke="red"
                strokeDasharray="5 5"
              />

              <Line
                type="monotone"
                dataKey="valor"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* LUZ */}

        <div className="chart-container">

          <h2>Luz</h2>

          <ResponsiveContainer
            width="100%"
            height={250}
          >

            <LineChart
              data={luzData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="fecha"
                tickFormatter={(value) =>
                  new Date(value)
                  .toLocaleTimeString(
                    "es-CO",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                }
              />

              <YAxis
                domain={[0, 300]}
              />

              <Tooltip
                formatter={(value) =>
                  [
                    Number(value)
                    .toFixed(2),
                    "Luz"
                  ]
                }
                labelFormatter={(label) =>
                  formatFecha(label)
                }
              />

              <ReferenceLine
                y={80}
                stroke="orange"
                strokeDasharray="5 5"
              />

              <ReferenceLine
                y={250}
                stroke="red"
                strokeDasharray="5 5"
              />

              <Line
                type="monotone"
                dataKey="valor"
                stroke="#eab308"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};

export default Historial;