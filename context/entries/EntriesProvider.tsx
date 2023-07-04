import { FC, useReducer } from 'react'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '@/interfaces'
import { v4 as uuidv4 } from 'uuid'

//In this file I have the state of my app
export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: React.ReactNode
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Pendiente: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, accusantium doloribus! Vero delectus impedit aspernatur totam expedita suscipit laboriosam, laborum quis, recusandae dolorem modi hic nostrum iure a, animi consequuntur.',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      _id: uuidv4(),
      description: 'In-progress: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, accusantium doloribus! Vero delectus impedit aspernatur totam expedita suscipit laboriosam, laborum quis, recusandae dolorem modi hic nostrum iure a, animi consequuntur.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      _id: uuidv4(),
      description: 'Terminadas: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, accusantium doloribus! Vero delectus impedit aspernatur totam expedita suscipit laboriosam, laborum quis, recusandae dolorem modi hic nostrum iure a, animi consequuntur.',
      status: 'finished',
      createdAt: Date.now() - 100000
    },
  ],
}

export const EntriesProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending'
    }
    dispatch( {type: '[Entry] - Add Entry', payload: newEntry})
  }

  const updateEntry = (entry: Entry) => {
    dispatch({type: '[Entry] - Entry-Updated', payload: entry})
    
  }
  
  

  return (
    <EntriesContext.Provider value={{
      ...state,

      //Methods
      addNewEntry,
      updateEntry
    }}>
      { children }
    </EntriesContext.Provider>
  )
}