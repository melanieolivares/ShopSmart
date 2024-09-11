import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import AuthNavigation from "./utils/AuthNavigation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import App from "./pages/App";
import Loading from "./pages/Loading";
import { CookiesProvider } from "react-cookie";

export default function AppRouter() {
  const { loading } = useAuth();

  return (
    <CookiesProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <AuthNavigation />
            {loading ? (
              <Loading />
            ) : (
              <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/products"
                  element={<ProtectedRoute element={<App />} />}
                />
              </Routes>
            )}
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}
