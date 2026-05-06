import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from '../store/savedSlice'
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Stack,
} from '@mui/material'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function DetailPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const savedItems = useSelector(state => state.saved.items)

  const product = location.state?.product
  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography>Product not found. Please go back and try again.</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    )
  }

  const { product_name, brands, nutriments, image_url, image_small_url, id } = product
  const isSaved = savedItems.some(item => item.id === id)

  const handleToggleSave = () => {
    if (isSaved) {
      dispatch(removeItem(id))
    } else {
      dispatch(addItem(product))
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back to Results
      </Button>
      <Card>
        {(image_url || image_small_url) && (
          <CardMedia
            component="img"
            height="300"
            image={image_url || image_small_url}
            alt={product_name}
            sx={{ objectFit: 'contain', bgcolor: '#fafafa' }}
          />
        )}
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={1}>
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {product_name}
              </Typography>
              {brands && (
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {brands}
                </Typography>
              )}
            </Box>
            <Button
              variant={isSaved ? 'outlined' : 'contained'}
              color={isSaved ? 'error' : 'success'}
              startIcon={isSaved ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
              onClick={handleToggleSave}
            >
              {isSaved ? 'Remove' : 'Save'}
            </Button>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Nutrition per 100g
          </Typography>
          <Stack spacing={1}>
            {[
              { label: 'Calories', value: nutriments['energy-kcal_100g'], unit: 'kcal' },
              { label: 'Protein', value: nutriments['proteins_100g'], unit: 'g' },
              { label: 'Carbohydrates', value: nutriments['carbohydrates_100g'], unit: 'g' },
              { label: 'Fat', value: nutriments['fat_100g'], unit: 'g' },
              { label: 'Saturated Fat', value: nutriments['saturated-fat_100g'], unit: 'g' },
              { label: 'Sugars', value: nutriments['sugars_100g'], unit: 'g' },
              { label: 'Fiber', value: nutriments['fiber_100g'], unit: 'g' },
              { label: 'Salt', value: nutriments['salt_100g'], unit: 'g' },
            ].map(({ label, value, unit }) => (
              <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', pb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">{label}</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {value != null ? `${value.toFixed(1)} ${unit}` : 'N/A'}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

export default DetailPage
