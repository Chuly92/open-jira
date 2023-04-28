import { createContext } from 'react'

export interface ContextProps {
  entries: []; //TO-DO tipo de dato del arreglo
}

export const EntriesContext = createContext({} as ContextProps)