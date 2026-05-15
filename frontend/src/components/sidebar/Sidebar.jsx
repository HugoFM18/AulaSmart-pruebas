import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div>

      <h2>AulaSmart</h2>

      <ul>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/alertas">Alertas</Link>
        </li>

        <li>
          <Link to="/dispositivos">Dispositivos</Link>
        </li>

        <li>
          <Link to="/sensores">Sensores</Link>
        </li>

        <li>
          <Link to="/usuarios">Usuarios</Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;