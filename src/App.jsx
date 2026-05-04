import { useState } from 'react'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (url) => {
    setLoading(true)

    try {
      const response = await fetch(url)
      const data = await response.json()

      // Filter products that have a name
      const filteredProducts = data.products.filter(product => product.product_name)
      setResults(filteredProducts)
    } catch (error) {
      console.error('Something went wrong:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>🥗 FoodFacts</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && (
        <p>Search for a food above to see its nutrition info.</p>
      )}
      <FoodList products={results} />
    </div>
  )
}

export default App