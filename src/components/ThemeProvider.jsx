"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Create theme context
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => null,
})

export function ThemeProvider({ children }) {
  // Initialize from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check for saved preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      
      // Check for system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  // Apply theme to document
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Get html element
    const html = document.documentElement;
    
    // Remove all theme classes
    html.classList.remove('light', 'dark', 'evening');
    
    // Add the current theme class
    html.classList.add(theme);
  }, [theme]);

  // Create theme toggle function that cycles through all three themes
  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "evening";
      return "light";
    });
  };

  // Context value
  const contextValue = {
    theme,
    toggleTheme
  };

  // Render provider
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme values
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
} 