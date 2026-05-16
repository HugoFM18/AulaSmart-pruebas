import "./AlertCard.css"

function AlertCard({ tipo, mensaje, nivel, fecha }) {
  return (
    <div className={`alert-card ${nivel}`}>
      <h3>{tipo}</h3>

      <p>{mensaje}</p>

      <span>{fecha}</span>
    </div>
  )
}

export default AlertCard