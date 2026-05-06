import { useState } from 'react'
import { Container, Typography, CircularProgress, Box } from '@mui/material'
import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'

function HomePage() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (url) => {
    setLoading(true)
    setSearched(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      const filteredProducts = data.products.filter(product => product.product_name)
      setResults(filteredProducts)
    } catch (error) {
      console.error('Failed to fetch products from OpenFoodFacts API:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="success.dark">
        Search Nutrition Info
      </Typography>
      <SearchBar onSearch={handleSearch} />
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress color="success" />
        </Box>
      )}
      {!loading && !searched && (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          Search for a food above to see its nutrition info.
        </Typography>
      )}
      {!loading && searched && <FoodList products={results} />}
    </Container>
  )
}

export default HomePage
