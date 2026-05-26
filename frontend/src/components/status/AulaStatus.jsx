import "./AulaStatus.css";

const AulaStatus = ({ stats }) => {

  // =====================================
  // VALORES
  // =====================================

  const temperatura =
    stats.promedios?.temperatura || 0;

  const humedad =
    stats.promedios?.humedad || 0;

  const ruido =
    stats.promedios?.sonido || 0;

  const luz =
    stats.promedios?.luz || 0;

  // =====================================
  // FORMATEAR
  // =====================================

  const formatValor = (valor) => {

    return Number(valor).toFixed(2);

  };

  // =====================================
  // VALIDACIONES
  // =====================================

  const temperaturaOK =
    temperatura <= 28;

  const humedadOK =
    humedad >= 30 &&
    humedad <= 70;

  const ruidoOK =
    ruido <= 55;

  const luzOK =
    luz >= 80 &&
    luz <= 250;

  // =====================================
  // CONDICIONES
  // =====================================

  const condicionesBuenas = [

    temperaturaOK,
    humedadOK,
    ruidoOK,
    luzOK,

  ].filter(Boolean).length;

  // =====================================
  // ESTADO
  // =====================================

  let estado = "";
  let titulo = "";
  let mensaje = "";

  if (condicionesBuenas === 4) {

    estado = "estable";

    titulo = "🟢 Aula apta";

    mensaje =
      "Las condiciones ambientales son óptimas.";

  }

  else if (condicionesBuenas >= 2) {

    estado = "precaucion";

    titulo = "🟡 Aula en observación";

    mensaje =
      "Existen condiciones ambientales moderadas.";

  }

  else {

    estado = "critico";

    titulo = "🔴 Aula no apta";

    mensaje =
      "Las condiciones ambientales son críticas.";

  }

  return (

    <div
      className={`aula-status ${estado}`}
    >

      {/* HEADER */}

      <div className="status-header">

        <div>

          <h2>
            Estado del Aula
          </h2>

          <p className="status-message">

            {titulo}

          </p>

        </div>

        <div className="status-badge">

          {estado.toUpperCase()}

        </div>

      </div>

      {/* MENSAJE */}

      <p className="status-description">

        {mensaje}

      </p>

      {/* DETALLES */}

      <div className="status-details">

        <div>

          🌡 Temperatura:
          {" "}
          {formatValor(temperatura)}
          °C

        </div>

        <div>

          💧 Humedad:
          {" "}
          {formatValor(humedad)}
          %

        </div>

        <div>

          🔊 Ruido:
          {" "}
          {formatValor(ruido)}
          dB

        </div>

        <div>

          💡 Luz:
          {" "}
          {formatValor(luz)}
          lx

        </div>

      </div>

    </div>
  );
};

export default AulaStatus;