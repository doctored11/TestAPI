import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { checkAuth, refreshAuthToken } from "./api/authApi";
import { startGoogleAuth } from "./api/googleApi";
import "./styles/global.css";
import { Frame } from "./components/Frame";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isRefrashed, setIsRefrashed] = useState(false);

  useEffect(() => {
    if (isRefrashed) {
      const timer = setTimeout(() => {
        setIsRefrashed(false);
      },  500);

      return () => clearTimeout(timer);
    }
  }, [isRefrashed]);

  useEffect(() => {
    checkAuth()
      .then((data) => {
        if (data.isAuthorized) {
          setIsAuthorized(true);
        }
      })
      .catch((error) => {
        console.error("Ошибка авторизации:", error);
      });
  }, []);

  const refreshToken = () => {
    refreshAuthToken()
      .then((data) => {
        if (data.success) {
          console.log("Токен успешно обновлён!");
          setIsRefrashed(true);
        }
      })
      .catch((error) => {
        console.error("Ошибка обновления токена:", error);
      });
  };

  return (
    <Frame
      isAuthorized={isAuthorized}
      onAuthClick={startGoogleAuth}
      onRefreshClick={refreshToken}
      isRefrashed = {isRefrashed}
    />
  );
}

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}
