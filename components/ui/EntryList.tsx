import { DragEvent, FC, useContext, useMemo } from "react"
import { List, Paper } from "@mui/material"
import { EntriesContext } from '../../context/entries'
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './'
import { UIContext } from "@/context/ui"
import styles from './EntryList.module.css'

interface Props { 
  status: EntryStatus
}

export const EntryList: FC<Props> = ( {status} ) => {

  const { entries, updateEntry } = useContext(EntriesContext)
  const {isDragging, endDragging} = useContext(UIContext)

  //A function which returns a value (in this case the filter of entries)
  //the value is memorized and it will be re-render when entries change
  //(or the condition that you put in the [] array of dependences)
  const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status), [entries])
  
  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    console.log(e)
    const id = e.dataTransfer.getData('text')
    
    const entry = entries.find(e => e._id === id)!
    entry.status = status
    updateEntry(entry)
    endDragging()
  }  

  return (
    <div 
      onDrop={onDropEntry} 
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}>
      <Paper sx={{ 
        height: 'calc(100vh - 175px)', 
        overflow: 'scroll', 
        backgroundColor: 'transparent', 
        padding: '2px 10px',
        '&::-webkit-scrollbar': { display: 'none' } }}>
          
        <List sx={{ opacity: isDragging ? 0.2 : 1, overflow: 'hidden', transition: 'all .3s' }}>
          { entriesByStatus.map (entry => 
            <EntryCard key={entry._id} entry={entry}/>) }
        </List>
      </Paper>
    </div>
  )
}
