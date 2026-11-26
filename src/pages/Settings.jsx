import { useState, useEffect } from "react";
import { useSettings } from "../context/SettingsContext";

export default function Settings() {
  const { theme, toggleTheme, username, setUsername } = useSettings();
  const [nameInput, setNameInput] = useState(username);
  const [saved, setSaved] = useState(false);

  // useEffect: hide the "Saved!" message after 2 seconds
  useEffect(() => {
    if (!saved) return;
    const timer = setTimeout(() => setSaved(false), 2000);
    return () => clearTimeout(timer); // cleanup if the page closes early
  }, [saved]);

  const handleSaveName = (e) => {
    e.preventDefault();
    setUsername(nameInput.trim());
    setSaved(true);
  };

  const handleClearData = () => {
    if (window.confirm("Delete ALL tasks, categories and settings? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <section>
      <h1>Settings</h1>

      <div className="card">
        <h2>Profile</h2>
        <form onSubmit={handleSaveName} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Your name"
            style={{ flex: 1, minWidth: 180 }}
          />
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
        {saved && <p className="success">✓ Saved!</p>}
      </div>

      <div className="card">
        <h2>Appearance</h2>
        <p>Current theme: <strong>{theme === "light" ? "☀️ Light" : "🌙 Dark"}</strong></p>
        <button className="btn" onClick={toggleTheme}>
          Switch to {theme === "light" ? "dark" : "light"} mode
        </button>
      </div>

      <div className="card card-danger">
        <h2>Danger zone</h2>
        <p>Permanently delete all your tasks, categories and settings.</p>
        <button className="btn btn-danger" onClick={handleClearData}>Clear all data</button>
      </div>
    </section>
  );
}