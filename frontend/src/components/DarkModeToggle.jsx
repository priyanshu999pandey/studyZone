import React, { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");   // ✅ important
      localStorage.setItem("theme", "light"); // ✅ correct place
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
        className="
    px-4 py-1.5 rounded-full
    bg-primary text-black
    
    border border-white/10
    hover:bg-accent
    transition-all duration-300
    hover:scale-105
    dark:hover:bg-red-950/50
    dark:bg-surface
    dark:text-white
    "
    >
      {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
