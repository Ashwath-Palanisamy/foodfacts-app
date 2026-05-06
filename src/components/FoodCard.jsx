import { useNavigate } from 'react-router-dom'

function FoodCard({ product }) {
    const navigate = useNavigate()
    const { product_name, brands, nutriments = {}, image_small_url, code } = product

    const handleClick = () => {
        if (!code) {
            return
        }

        navigate(`/product/${code}`)
    }

    return (
        <div className="food-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            {image_small_url && <img src={image_small_url} alt={product_name} />}
            <h3>{product_name}</h3>
            {brands && <p className="brand"><strong>Brand:</strong> {brands}</p>}
            <div className="nutrients">
                <p><strong>Calories:</strong> {nutriments['energy-kcal_100g']?.toFixed(1) || 'N/A'} kcal</p>
                <p><strong>Protein:</strong> {nutriments.proteins_100g?.toFixed(1) || 'N/A'} g</p>
                <p><strong>Carbs:</strong> {nutriments.carbohydrates_100g?.toFixed(1) || 'N/A'} g</p>
                <p><strong>Fat:</strong> {nutriments.fat_100g?.toFixed(1) || 'N/A'} g</p>
            </div>
        </div>
    )
}

export default FoodCard