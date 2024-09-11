import {
  Menu as MenuContainer,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ArrowRightStartOnRectangleIcon,
  MoonIcon,
  SunIcon,
  CogIcon,
} from "@heroicons/react/20/solid";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Menu() {
  const { theme, setTheme } = useTheme();
  const { setIsAuthenticated } = useAuth();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/authentication/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <MenuContainer as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex items-center text-modalSVGSubmit hover:text-modalSVGSubmit/70">
          <span className="sr-only">Open options</span>
          <CogIcon
            aria-hidden="true"
            className="h-8 w-8 hover:animate-spin-slow"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 bottom-full z-10 mb-2 w-56 origin-bottom-left rounded-md bg-background shadow-lg transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              onClick={toggleTheme}
              className="group w-full flex items-center px-4 py-2 text-sm text-modalSVGSubmit data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              {theme === "dark" ? (
                <SunIcon
                  aria-hidden="true"
                  className="mr-2 h-5 w-5 text-modalSVGSubmit group-hover:text-gray-600"
                />
              ) : (
                <MoonIcon
                  aria-hidden="true"
                  className="mr-2 h-5 w-5 text-modalSVGSubmit group-hover:text-gray-600"
                />
              )}
              Change theme
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={handleLogout}
              className="group w-full flex items-center px-4 py-2 text-sm text-modalSVGSubmit data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              <ArrowRightStartOnRectangleIcon
                aria-hidden="true"
                className="mr-2 h-5 w-5 text-modalSVGSubmit group-hover:text-gray-600"
              />
              Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </MenuContainer>
  );
}
