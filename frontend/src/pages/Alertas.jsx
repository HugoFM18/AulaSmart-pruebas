import "./Alertas.css"

import { useEffect, useState } from "react"

import AlertCard from "../components/cards/AlertCard"
import AlertTable from "../components/tables/AlertTable"

import { getAlertas } from "../services/alertasService"

function Alertas() {

  const [alertas, setAlertas] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchAlertas = async () => {

      try {

        const data = await getAlertas()

        setAlertas(data)

      } catch (err) {

        setError(
          "Error cargando alertas"
        )

      } finally {

        setLoading(false)
      }
    }

    fetchAlertas()

  }, [])

  if (loading) {
    return <h2>Cargando alertas...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }

  return (

    <div className="alertas-page">

      <div className="alertas-header">

        <h1>Alertas del Sistema</h1>

        <p>
          Monitoreo y detección de anomalías
          provenientes de sensores IoT.
        </p>

      </div>

      <div className="alertas-grid">

        {alertas.map((alerta) => (

          <AlertCard
            key={alerta.id}

            tipo={alerta.tipo_sensor}

            mensaje={alerta.mensaje}

            nivel={alerta.nivel}

            fecha={
              new Date(
                alerta.timestamp
              ).toLocaleString()
            }
          />

        ))}

      </div>

      <AlertTable alertas={alertas} />

    </div>
  )
}

export default Alertas