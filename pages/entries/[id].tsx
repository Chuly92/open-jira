import { Layout } from '@/components/layouts'
import { EntryStatus } from '@/interfaces'
import { DeleteOutline, SaveOutlined } from '@mui/icons-material'
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

export const EntryPage = () => {
  return (
    <Layout title='...'>
      <Grid
        container
        justifyContent='center'
        sx={{marginTop: 2}}
        >
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardHeader title='Entrada' subheader={`Creada hace ... minutos`}/>
              <CardContent>
                <TextField
                  sx={{marginTop: 2, marginBottom: 1}}
                  fullWidth
                  placeholder='Nueva entrada'
                  autoFocus
                  multiline
                  label='Nueva entrada'
                />
                <FormControl>
                  <FormLabel sx={{marginTop: 2, marginBottom: 1}}>Estado:</FormLabel>
                  <RadioGroup row>
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

export default EntryPage
