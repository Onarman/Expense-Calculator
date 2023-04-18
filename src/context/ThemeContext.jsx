import { createContext, useContext, useEffect, useState } from "react";

// 1- Defination
export const ThemeContext = createContext({
  theme: "",
  toggleTheme: () => {},
});

//2-Provider Component
export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const body = document.querySelector('body');
    body.className = theme;
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

//3-Consume

export const useThemeChange = () => {
  return useContext(ThemeContext);
};
