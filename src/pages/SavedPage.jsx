import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../store/savedSlice'
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Divider,
  Box,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'

function SavedPage() {
  const savedItems = useSelector(state => state.saved.items)
  const dispatch = useDispatch()

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Saved Items ({savedItems.length})
      </Typography>

      {savedItems.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          No saved items yet. Search for foods and save them to see them here.
        </Typography>
      ) : (
        <List>
          {savedItems.map((item, index) => (
            <Box key={item.id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <IconButton edge="end" aria-label="remove" color="error" onClick={() => dispatch(removeItem(item.id))}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    src={item.image_small_url}
                    alt={item.product_name}
                    variant="rounded"
                    sx={{ width: 56, height: 56, mr: 1 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      component={Link}
                      to={`/product/${item.id}`}
                      state={{ product: item }}
                      sx={{ textDecoration: 'none', color: 'success.dark', fontWeight: 'bold' }}
                    >
                      {item.product_name}
                    </Typography>
                  }
                  secondary={
                    <>
                      {item.brands && <span>{item.brands} · </span>}
                      <span>{item.nutriments['energy-kcal_100g']?.toFixed(0) || 'N/A'} kcal / 100g</span>
                    </>
                  }
                />
              </ListItem>
              {index < savedItems.length - 1 && <Divider variant="inset" component="li" />}
            </Box>
          ))}
        </List>
      )}
    </Container>
  )
}

export default SavedPage
