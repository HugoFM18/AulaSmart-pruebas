import "../../styles/dispositivos/deviceCard.css";

function DeviceCard({ dispositivo }) {
  return (
    <div className="device-card">

      <h3>{dispositivo.nombre}</h3>

      <p>
        Estado:
        {dispositivo.activo ? " Activo" : " Inactivo"}
      </p>

      <p>
        Sensores activos:
        {dispositivo.sensores}
      </p>

    </div>
  );
}

export default DeviceCard;