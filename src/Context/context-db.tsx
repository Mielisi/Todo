import { createContext } from "react";
export const DBContext = createContext<{
  ur: string;
  setUrl: (url: string) => void;
  isModalOpened: boolean;
  setIsModalOpened: (show?: boolean) => void;
}>({
  ur: "",
  setUrl: (url: string) => {},
  isModalOpened: false,
  setIsModalOpened: (show?:boolean) => {},
});
