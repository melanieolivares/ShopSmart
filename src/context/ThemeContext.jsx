import { createContext, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [cookies, setCookie] = useCookies(["theme"]);

  // init cookie
  useEffect(() => {
    const savedTheme = cookies.theme || "light";
    setTheme(savedTheme);
  }, []);

  // updates cookie
  useEffect(() => {
    setCookie("theme", theme);
  }, [theme, setCookie]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
