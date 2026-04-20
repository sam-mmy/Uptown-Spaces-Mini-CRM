import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        <div className="logo">
          {/* <NavLink to="/dashboard" className="nav-item">  */}
              Uptown Spaces CRM
          {/* </NavLink> */}
        </div>

        <nav className="nav-links">
           <NavLink to="/dashboard" className="nav-item">
            Dashboard
          </NavLink>

          <NavLink to="/" className="nav-item">
            Leads
          </NavLink>

          <NavLink to="/create" className="nav-item">
            Create Lead
          </NavLink>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;