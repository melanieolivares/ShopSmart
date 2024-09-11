/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      colors: {
        background: "rgba(var(--background))",
        backgroundBody: "rgba(var(--backgroundBody))",
        inputField: "rgba(var(--inputField))",
        text: "rgba(var(--text))",
        productTitle: "rgba(var(--productTitle))",
        productBrand: "rgba(var(--productBrand))",
        productCurrPrice: "rgba(var(--productCurrPrice))",
        productSubPrices: "rgba(var(--productSubPrices))",
        productInfo: "rgba(var(--productInfo))",
        productDate: "rgba(var(--productDate))",
        productRemove: "rgba(var(--productRemove))",
        productBuy: "rgba(var(--productBuy))",
        modalTitle: "rgba(var(--modalTitle))",
        modalSVGCancel: "rgba(var(--modalTitle))",
        modalSVGSubmit: "rgba(var(--modalSVGSubmit))",
        mainSVG: "rgba(var(--mainSVG))",
        accentColorDark: "rgba(var(--accentColorDark))",
        accentColorLight: "rgba(var(--accentColorLight))",
      },
    },
  },
  plugins: [forms],
};
