import { createContext } from 'react'
import { Entry } from '@/interfaces'


export interface ContextProps {
  entries: Entry[]; //TO-DO tipo de dato del arreglo

  //Methods
  addNewEntry: (description: string) => void
  updateEntry: (entry: Entry, showSnackBar?: boolean) => void
}

export const EntriesContext = createContext({} as ContextProps)