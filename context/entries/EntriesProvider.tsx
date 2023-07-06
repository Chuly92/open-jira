import { FC, useEffect, useReducer } from 'react'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '@/interfaces'
import { entriesApi } from '@/apis'
// import { v4 as uuidv4 } from 'uuid'

//In this file I have the state of my app
export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: React.ReactNode
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: []
}

export const EntriesProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = async (description: string) => {
    const {data} = await entriesApi.post<Entry>('/entries', {description})
    dispatch( {type: '[Entry] - Add Entry', payload: data})
    // const newEntry: Entry = {
    //   _id: uuidv4(),
    //   description,
    //   createdAt: Date.now(),
    //   status: 'pending'
    // }
  }

  const updateEntry = async ({_id, description, status}: Entry) => {

    try {
      const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status})
      dispatch({type: '[Entry] - Entry-Updated', payload: data})      
    } catch (error) {
      console.log({error})
    }
    
  }

  const refreshEntries = async () => {
    const {data} = await entriesApi.get<Entry[]>('/entries')
    dispatch({type: '[Entry] - Refresh-Data', payload: data})    
  }
  
  useEffect(() => {
    refreshEntries()

  }, [])
  

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