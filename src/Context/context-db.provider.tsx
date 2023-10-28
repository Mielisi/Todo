import { useEffect, useState } from "react";
import { DBContext } from "./context-db";
import { DBproviderProps } from "../types/context/db-context/DBproviderProps";

export const DBprovider = ({ children }: DBproviderProps) => {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");

  function setShowModalHandler(show?: boolean) {
    setShowModal(show ? show : (prevState) => !prevState);
  }

  useEffect(() => {
    if (
      localStorage.getItem("url") !== undefined ||
      localStorage.getItem("url").trim() !== ""
    ) {
      setUrl(localStorage.getItem("url"));
    } else {
      setTimeout(() => {
        setShowModalHandler(true);
      }, 1000);
    }
  }, [setUrl, url]);

  function setUrlHandler(url: string) {
    setUrl(url);
    localStorage.setItem("dbUrl", url);
  }

  return (
    <DBContext.Provider
      value={{
        ur: url,
        setUrl: setUrlHandler,
        isModalOpened: showModal,
        setIsModalOpened: setShowModalHandler,
      }}
    >
      {children}
    </DBContext.Provider>
  );
};
