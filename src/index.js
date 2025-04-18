import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { ProgressSpinner } from "primereact/progressspinner";
import { ToastContainer } from "react-toastify";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "fr", "ar"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["localStorage", "cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
    react: { useSuspense: false },
  });

const root = ReactDOM.createRoot(document.getElementById("root"));

const loadingMarkup = (
  <div
    className="flex justify-center items-center z-50 w-full h-full fixed top-0 left-0"
    style={{ background: "rgba(0, 0, 0, 0.5);" }}
  >
    <ProgressSpinner />
  </div>
);

root.render(
  <Suspense fallback={loadingMarkup}>
    {/* <React.StrictMode> */}
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </PrimeReactProvider>
    {/* </React.StrictMode> */}
  </Suspense>
);
