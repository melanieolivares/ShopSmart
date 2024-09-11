import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/shopsmart.png";
import videoBackground from "../assets/854100-hd_1920_1080_25fps.mp4";
import { useTheme } from "../context/ThemeContext";

export default function Signup() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const addUser = async (e) => {
    e.preventDefault();
    if (userData.password.length < 7) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/authentication/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userData }),
          credentials: "include",
        }
      );
      const data = await response.json();

      if (response.status === 409) {
        toast.error(data.error);
      } else if (response.ok) {
        navigate("/products");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Toaster />
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className={`${theme} relative z-10 flex h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8`}
      >
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-backgroundBody px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <img
              alt="Barcode"
              src={logo}
              className="mx-auto w-32 object-cover rounded-md mb-10"
            />
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h3 className="text-center mt-4 mb-10 text-3xl font-bold leading-9 tracking-tight text-mainSVG">
                Create an account
              </h3>
            </div>
            <form onSubmit={addUser} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-mainSVG"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-text shadow-sm ring-1 ring-inset bg-background ring-inputField placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accentColorDark sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-mainSVG"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-text shadow-sm ring-1 ring-inset bg-background ring-inputField placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accentColorDark sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-mainSVG"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-text shadow-sm ring-1 ring-inset bg-background ring-inputField placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accentColorDark sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="pt-6">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-accentColorDark px-3 py-1.5 text-sm font-semibold leading-6 text-backgroundBody shadow-sm hover:bg-accentColorLight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentColorDark"
                >
                  Create Account
                </button>
              </div>
            </form>
            <div className="mt-10 text-center text-sm text-text font-extralight">
              Have an account?{" "}
              <span className="font-semibold leading-6 text-accentColorDark hover:text-accentColorLight">
                <Link to="/login">Log in</Link>
              </span>
            </div>

            {/* <div>
              <div className="relative mt-10">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-backgroundBody px-6 text-mainSVG">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                  <span className="text-sm font-semibold leading-6">
                    Google
                  </span>
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
