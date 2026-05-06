import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'

function DetailPage({ saved, dispatch }) {
    const { barcode } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const fetchProduct = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`)

                if (!response.data.product) {
                    throw new Error('Product not found')
                }

                if (isMounted) {
                    setProduct(response.data.product)
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.response ? `Server error: ${err.response.status}. Please try again.` : 'Failed to load product details.')
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchProduct()

        return () => {
            isMounted = false
        }
    }, [barcode])

    const isSaved = saved.some((p) => p.code === barcode)

    const handleSaveToggle = () => {
        if (!product) {
            return
        }

        if (isSaved) {
            dispatch({ type: 'REMOVE', code: barcode })
        } else {
            dispatch({ type: 'ADD', product })
        }
    }

    if (loading) {
        return <p>Loading product details...</p>
    }

    if (error) {
        return <ErrorMessage message={error} />
    }

    if (!product) {
        return <ErrorMessage message="No product found for this barcode." />
    }

    const nutriments = product.nutriments || {}

    return (
        <div className="detail-page">
            <h2>{product.product_name || 'Unknown product'}</h2>
            {product.image_small_url && (
                <img src={product.image_small_url} alt={product.product_name} className="detail-image" />
            )}
            {product.brands && <p><strong>Brand:</strong> {product.brands}</p>}
            <div className="nutrients">
                <p><strong>Calories:</strong> {nutriments['energy-kcal_100g']?.toFixed(1) || 'N/A'} kcal</p>
                <p><strong>Protein:</strong> {nutriments.proteins_100g?.toFixed(1) || 'N/A'} g</p>
                <p><strong>Carbs:</strong> {nutriments.carbohydrates_100g?.toFixed(1) || 'N/A'} g</p>
                <p><strong>Fat:</strong> {nutriments.fat_100g?.toFixed(1) || 'N/A'} g</p>
            </div>
            <button onClick={handleSaveToggle}>
                {isSaved ? '★ Remove from Saved' : '☆ Save to My List'}
            </button>
        </div>
    )
}

export default DetailPage