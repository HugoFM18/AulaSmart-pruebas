import "./Historial.css"

import {
  useEffect,
  useState
} from "react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

import {
  getHistorial
} from "../services/historialService"

function Historial() {

  const [historial, setHistorial] =
    useState([])

  const [estadisticas, setEstadisticas] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const fetchHistorial = async () => {

      try {

        const data =
          await getHistorial()

        setHistorial(data.historial)

        setEstadisticas(
          data.estadisticas
        )

      } catch (error) {

        console.error(error)

      } finally {

        setLoading(false)
      }
    }

    fetchHistorial()

  }, [])

  if (loading) {
    return <h2>Cargando...</h2>
  }

  // =========================
  // FILTRAR DATOS POR SENSOR
  // =========================

  const temperaturaData =
    historial.filter(
      item =>
        item.sensor === "temperatura"
    )

  const humedadData =
    historial.filter(
      item =>
        item.sensor === "humedad"
    )

  const sonidoData =
    historial.filter(
      item =>
        item.sensor === "sonido"
    )

  const luzData =
    historial.filter(
      item =>
        item.sensor === "luz"
    )

  return (

    <div className="historial-page">

      <div className="historial-header">

        <h1>
          Historial Inteligente
        </h1>

      </div>

      {/* KPI */}

      <div className="kpi-grid">

        <div className="kpi-card">
          <h3>Temp. Promedio</h3>

          <p>
            {
              estadisticas.promedios
                .temperatura
            }
          </p>
        </div>

        <div className="kpi-card">
          <h3>Humedad Promedio</h3>

          <p>
            {
              estadisticas.promedios
                .humedad
            }
          </p>
        </div>

        <div className="kpi-card">
          <h3>Máximo Global</h3>

          <p>
            {estadisticas.maximo}
          </p>
        </div>

        <div className="kpi-card">
          <h3>Mínimo Global</h3>

          <p>
            {estadisticas.minimo}
          </p>
        </div>

      </div>

      {/* ===================== */}
      {/* GRÁFICAS */}
      {/* ===================== */}

      <div className="charts-grid">

        {/* TEMPERATURA */}

        <div className="chart-container">

          <h3>Temperatura</h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart data={temperaturaData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="fecha" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="valor"
                stroke="#ef4444"
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* HUMEDAD */}

        <div className="chart-container">

          <h3>Humedad</h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart data={humedadData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="fecha" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="valor"
                stroke="#3b82f6"
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* SONIDO */}

        <div className="chart-container">

          <h3>Sonido</h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart data={sonidoData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="fecha" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="valor"
                stroke="#f59e0b"
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* LUZ */}

        <div className="chart-container">

          <h3>Luz</h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart data={luzData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="fecha" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="valor"
                stroke="#22c55e"
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* TABLA */}

      <div className="historial-table-container">

        <table className="historial-table">

          <thead>

            <tr>
              <th>Sensor</th>
              <th>Valor</th>
              <th>Unidad</th>
              <th>Dispositivo</th>
              <th>Ubicación</th>
              <th>Fecha</th>
            </tr>

          </thead>

          <tbody>

            {historial.map((item) => (

              <tr key={item.id}>

                <td>{item.sensor}</td>

                <td>{item.valor}</td>

                <td>{item.unidad}</td>

                <td>
                  {item.dispositivo.nombre}
                </td>

                <td>
                  {item.dispositivo.ubicacion}
                </td>

                <td>
                  {new Date(
                    item.fecha
                  ).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Historial