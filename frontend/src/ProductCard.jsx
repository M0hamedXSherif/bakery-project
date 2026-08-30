
function ProductCard({product, onadd}) {
    return(
        <div className="card">
            <img src={product.imageUrl} alt={product.alt}/>
            <h2>{product.name}</h2>
            <div className="buy">
                <span>{product.price}ج</span>
                <button className="buy-btn" onClick={() => onadd(product)}>
                    شراء 🛒
                </button>
            </div>
        </div>
    )
}

export default ProductCard