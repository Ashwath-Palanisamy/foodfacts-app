import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import ErrorMessage from '../components/ErrorMessage'
import useFoodSearch from '../hooks/useFoodSearch'

function HomePage() {
    const { results, loading, error, searchFood } = useFoodSearch()

    return (
        <div className="page">
            <h2>Search Nutrition Info</h2>
            <SearchBar onSearch={searchFood} />
            {loading && <p>Loading...</p>}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && results.length > 0 && <FoodList products={results} />}
            {!loading && !error && results.length === 0 && (
                <p>Search for a food above to see its nutrition info.</p>
            )}
        </div>
    )
}

export default HomePage