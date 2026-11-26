import { Link, NavLink } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";

export default function Navbar() {
  const { theme, toggleTheme } = useSettings();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">Todo App</Link>

        <nav className="navbar-links">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/tasks" end>Tasks</NavLink>
          <NavLink to="/tasks/new">New Task</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/settings">Settings</NavLink>
          <button
            className="btn btn-small"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </nav>
      </div>
    </header>
  );
}