import { useContext } from "react"
import NextLink from "next/link"
import { UIContext } from "@/context/ui"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"

export const Navbar = () => {

  const { openSideMenu } = useContext(UIContext)

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink href='/' passHref>
            <Typography color='white' variant='h6'>OpenJira</Typography>
        </NextLink>
      </Toolbar>

    </AppBar>
  )
}
