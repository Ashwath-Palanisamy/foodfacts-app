import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'

function FoodCard({ product }) {
  const { product_name, brands, nutriments, image_small_url, id } = product

  return (
    <Card
      component={Link}
      to={`/product/${id}`}
      state={{ product }}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        transition: 'box-shadow 0.3s',
        '&:hover': { boxShadow: 6 },
      }}
    >
      {image_small_url && (
        <CardMedia
          component="img"
          height="180"
          image={image_small_url}
          alt={product_name}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product_name}
        </Typography>
        {brands && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {brands}
          </Typography>
        )}
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            <strong>Calories:</strong> {nutriments['energy-kcal_100g']?.toFixed(1) || 'N/A'} kcal
          </Typography>
          <Typography variant="body2">
            <strong>Protein:</strong> {nutriments['proteins_100g']?.toFixed(1) || 'N/A'} g
          </Typography>
          <Typography variant="body2">
            <strong>Carbs:</strong> {nutriments['carbohydrates_100g']?.toFixed(1) || 'N/A'} g
          </Typography>
          <Typography variant="body2">
            <strong>Fat:</strong> {nutriments['fat_100g']?.toFixed(1) || 'N/A'} g
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default FoodCard