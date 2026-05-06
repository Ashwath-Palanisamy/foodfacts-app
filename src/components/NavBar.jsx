import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function NavBar() {
  const savedCount = useSelector(state => state.saved.items.length)
  const navigate = useNavigate()

  return (
    <AppBar position="static" color="success">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}
        >
          🥗 FoodFacts
        </Typography>
        <Box>
          <IconButton color="inherit" onClick={() => navigate('/saved')} aria-label="saved items">
            <Badge badgeContent={savedCount} color="warning">
              <BookmarkIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
