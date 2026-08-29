
function ProductCard({product, onadd}) {
    return(
        <div className="card">
            <img src={product.address} alt={product.alt}/>
            <h2>{product.name}</h2>
            <div className="buy">
                <span>{product.price}</span>
                <button onClick={() => onadd(product)}>
                    Add to cart 🛒
                </button>
            </div>
        </div>
    )
}

export default ProductCard