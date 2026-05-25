import "./AulaStatus.css";

const AulaStatus = ({ stats }) => {

  const temperatura =
    stats.promedios?.temperatura || 0;

  const humedad =
    stats.promedios?.humedad || 0;

  const sonido =
    stats.promedios?.sonido || 0;

  const luz =
    stats.promedios?.luz || 0;

  let estado = "Aula estable";
  let mensaje =
    "Las condiciones ambientales son óptimas.";
  let clase = "estable";
  let icono = "🟢";

  let alertas = 0;

  // TEMPERATURA

  if (
    temperatura > 30
  ) {
    alertas++;
  }

  if (
    temperatura > 33
  ) {
    alertas += 2;
  }

  // HUMEDAD

  if (
    humedad > 70
  ) {
    alertas++;
  }

  if (
    humedad > 80
  ) {
    alertas += 2;
  }

  // SONIDO

  if (
    sonido > 750
  ) {
    alertas++;
  }

  if (
    sonido > 900
  ) {
    alertas += 2;
  }

  // LUZ

  if (
    luz < 250
  ) {
    alertas++;
  }

  if (
    luz < 120
  ) {
    alertas += 2;
  }

  // ESTADO FINAL

  if (
    alertas >= 4
  ) {

    estado = "Aula no apta";

    mensaje =
      "Las condiciones ambientales son críticas.";

    clase = "critico";

    icono = "🔴";

  }

  else if (
    alertas >= 2
  ) {

    estado = "Precaución";

    mensaje =
      "Se detectaron condiciones irregulares.";

    clase = "precaucion";

    icono = "🟡";
  }

  return (

    <div className={`aula-status ${clase}`}>

      <div className="status-header">

        <h2>
          Estado del Aula
        </h2>

        <span className="status-badge">
          {icono} {estado}
        </span>

      </div>

      <p className="status-message">
        {mensaje}
      </p>

      <div className="status-details">

        <div>
          🌡 Temperatura:
          {temperatura} °C
        </div>

        <div>
          💧 Humedad:
          {humedad} %
        </div>

        <div>
          🔊 Ruido:
          {sonido}
        </div>

        <div>
          💡 Luz:
          {luz}
        </div>

      </div>

    </div>
  );
};

export default AulaStatus;