import { ChangeEvent, FC, useMemo, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Layout } from '@/components/layouts'
import { Entry, EntryStatus } from '@/interfaces'
import { DeleteOutline, SaveOutlined } from '@mui/icons-material'
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material'
import { dbEntries } from '@/database'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}

export const EntryPage: FC<Props> = ({entry}) => {

  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)
  
  const isNotValid = useMemo(() => inputValue.length <=0 && touched, [inputValue, touched])

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setStatus(e.target.value as EntryStatus)
  }

  const handleOnClick = () => {

  }
  

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid
        container
        justifyContent='center'
        sx={{marginTop: 2}}
        >
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardHeader 
                title='Entrada' 
                subheader={`Creada hace ... minutos`}
              />
              <CardContent>
                <TextField
                  sx={{marginTop: 2, marginBottom: 1}}
                  fullWidth
                  placeholder='Nueva entrada'
                  autoFocus
                  multiline
                  label='Nueva entrada'
                  value={inputValue}
                  onChange={onInputChange}
                  helperText={isNotValid && 'Ingrese un valor'}
                  onBlur={ () => setTouched(true)}
                  error={ isNotValid }
                />
                <FormControl>
                  <FormLabel sx={{marginTop: 2, marginBottom: 1}}>Estado:</FormLabel>
                  <RadioGroup 
                    row
                    value={status}
                    onChange={onStatusChange}
                  >
                    {
                      validStatus.map( opt => (
                        <FormControlLabel
                          key={opt}
                          value={opt}
                          control={<Radio/>}
                          label={capitalize(opt)}
                        />
                      ))
                    }
                  </RadioGroup>
                </FormControl>

                {/* Radio */}
              </CardContent>
              <CardActions>
                <Button
                startIcon={<SaveOutlined/>}
                variant='contained'
                fullWidth
                sx={{margin: 1}}
                onClick={handleOnClick}
                disabled={inputValue.length <= 0}
                >
                  Save
                </Button>
              </CardActions>
            </Card>

          </Grid>

      </Grid>

      <IconButton sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        backgroundColor: 'error.dark'
      }}>
        <DeleteOutline/>
      </IconButton>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({params}) => {

  const {id} = params as {id: string}

  const entry = await dbEntries.getEntryById( id )

  console.log(entry)

  if (!entry){    
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }


  return {
    props: {
      entry
    }
  }
}

export default EntryPage
