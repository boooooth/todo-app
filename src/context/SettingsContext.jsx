import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  // Saved in localStorage, so they survive a refresh
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [username, setUsername] = useLocalStorage("username", "");

  // useEffect: apply the theme to the whole page whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = { theme, toggleTheme, username, setUsername };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  return useContext(SettingsContext);
}