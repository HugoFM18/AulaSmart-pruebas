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
  // REGLAS
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
  // ESTADO GENERAL
  // =====================================

  const aulaEstable =
    temperaturaOK &&
    humedadOK &&
    ruidoOK &&
    luzOK;

  return (

    <div
      className={
        aulaEstable
          ? "aula-status estable"
          : "aula-status alerta"
      }
    >

      <div className="status-header">

        <h2>
          Estado del Aula
        </h2>

        <span>

          {
            aulaEstable
              ? "ESTABLE"
              : "NO ESTABLE"
          }

        </span>

      </div>

      <div className="status-details">

        <p>
          🌡 Temperatura:
          {" "}
          {formatValor(temperatura)}
          °C
        </p>

        <p>
          💧 Humedad:
          {" "}
          {formatValor(humedad)}
          %
        </p>

        <p>
          🔊 Ruido:
          {" "}
          {formatValor(ruido)}
          dB
        </p>

        <p>
          💡 Luz:
          {" "}
          {formatValor(luz)}
          lx
        </p>

      </div>

    </div>
  );
};

export default AulaStatus;