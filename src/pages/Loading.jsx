import logo from "../assets/shopsmart.png";
import { useTheme } from "../context/ThemeContext";

export default function Loading() {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <div className="flex h-screen items-center justify-center bg-backgroundBody">
        <img src={logo} alt="ShopSmart Logo" className="animate-pulse" />
      </div>
    </div>
  );
}
