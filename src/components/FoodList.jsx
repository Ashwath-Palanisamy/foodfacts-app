import { Grid, Typography } from '@mui/material'
import FoodCard from './FoodCard'

function FoodList({ products }) {
  if (products.length === 0) {
    return (
      <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
        No results found. Try a different search.
      </Typography>
    )
  }

  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <FoodCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}

export default FoodList