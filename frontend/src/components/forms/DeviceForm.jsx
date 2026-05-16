import "../../styles/dispositivos/deviceForm.css";

function DeviceForm() {

  return (
    <form className="device-form">

      <input
        type="text"
        placeholder="Nombre del dispositivo"
      />

      <input
        type="number"
        placeholder="Sensores"
      />

      <button type="submit">
        Agregar
      </button>

    </form>
  );
}

export default DeviceForm;