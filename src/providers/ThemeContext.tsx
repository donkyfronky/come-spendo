"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const localStorageLabel = 'come-spendo-theme'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // This code will only run on the client side
  const savedTheme = localStorage.getItem(localStorageLabel) as Theme | null;
  const initialTheme = savedTheme || "dark"; // Default to light theme
  const [theme, setTheme] = useState<Theme>(initialTheme || 'light');

  useEffect(() => {

    localStorage.setItem(localStorageLabel, theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line: react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
