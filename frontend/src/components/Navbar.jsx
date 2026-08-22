import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Dayflow
      </Link>

      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/leave">Leave</Link>
        <Link to="/payroll">Payroll</Link>
      </div>
    </nav>
  );
}

export default Navbar;