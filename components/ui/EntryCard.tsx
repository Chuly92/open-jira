
import { UIContext } from '@/context/ui'
import { Entry } from '../../interfaces'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { DragEvent, FC, useContext } from 'react'
import { useRouter } from 'next/router'

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({entry}) => {

  const {isDragging, startDragging, endDragging} = useContext(UIContext)
  const router = useRouter()

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    console.log(e)
    e.dataTransfer?.setData('text', entry._id)

    startDragging()
  }

  const onDragEnd = () => {
    endDragging()
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
}
  
  
  
  return (
    <Card 
      onClick={onClick}
      sx={{marginBottom: 1}}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{whiteSpace: 'pre-line'}}>
            {entry.description}
          </Typography>
        </CardContent>

      <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: 2}}>
        <Typography variant='body2'>
          hace 30 minutos
        </Typography>
      </CardActions>

      </CardActionArea>
    </Card>
  )
}
