import React from "react";
import styles from "./styles.module.css";

interface FrameProps {
  isAuthorized: boolean;
  onAuthClick: () => void;
  onRefreshClick: () => void;
  isRefrashed:boolean
}

export function Frame({
  isAuthorized,
  onAuthClick,
  onRefreshClick,
  isRefrashed
}: FrameProps) {
  return (
    <div className={styles.frame}>
      <h1 className="simpleTxt">
      {isAuthorized ? (isRefrashed ? "Авторизован ✔️" : "Авторизован ✨") : "не авторизован 🤡"}

      </h1>
      {isAuthorized && (
        <button className={"simpleTxt btn"} onClick={onRefreshClick}>
          Обновить токен
        </button>
      )}
      <button className={"simpleTxt btn"} onClick={onAuthClick}>
        Авторизация Google
      </button>
    </div>
  );
}
