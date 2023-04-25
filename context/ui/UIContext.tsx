import { createContext } from 'react'

//In this file I have the properties declared
export interface ContextProps {
  sideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps)