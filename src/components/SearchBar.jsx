import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=10`
      onSearch(url)
      setQuery('')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 3 }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search for a food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ width: 320 }}
      />
      <Button type="submit" variant="contained" color="success" startIcon={<SearchIcon />}>
        Search
      </Button>
    </Box>
  )
}

export default SearchBar