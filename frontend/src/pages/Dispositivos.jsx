import DeviceCard from "../components/cards/DeviceCard";
import DeviceForm from "../components/forms/DeviceForm";

import "../styles/dispositivos/dispositivos.css";

function Dispositivos() {

  const dispositivos = [
    {
      id: 1,
      nombre: "Sensor Temperatura",
      activo: true,
      sensores: 4,
    },

    {
      id: 2,
      nombre: "Sensor Humedad",
      activo: false,
      sensores: 2,
    },
  ];

  return (
    <div className="dispositivos-container">

      <h1>Dispositivos</h1>

      <DeviceForm />

      <div className="cards-container">

        {dispositivos.map((dispositivo) => (
          <DeviceCard
            key={dispositivo.id}
            dispositivo={dispositivo}
          />
        ))}

      </div>

    </div>
  );
}

export default Dispositivos;