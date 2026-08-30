import { useState, useEffect } from "react";
import ProductCard from './ProductCard.jsx'
import Cart from './Cart.jsx'
import Navbar from './Navbar.jsx'



function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [theme, setTheme] = useState("light")
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect( () => {
    fetch("https://efficient-warmth-production-3ad5.up.railway.app/products")
    .then(response => response.json())
    .then(data => setProducts(data))
  }, [])
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])
  
  function addToCart(product) {
    setCart([...cart, product])
  }

  function removeFromCart(indexToRemove) {
  setCart(cart.filter((item, index) => index !== indexToRemove))
  }

  function checkout() {
    setCart([])
    setIsCartOpen(false)
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)


  return(
    <>
      <Navbar 
        theme={theme} 
        onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")} 
        username="أحمد" 
      />
      <section className="product-grid">
        {products.map(product => {
          return(
            <ProductCard
              key={product.id}
              product={product}
              onadd={addToCart}
            />
          )
        })
      }
      </section>

      {cart.length > 0 && (
        <button className="floating-cart-btn" onClick={() => setIsCartOpen(true)}>
          <span>🛒</span> <span>{cart.length}</span> 
        </button>
      )}
      
      {isCartOpen && (
        <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <Cart cart={cart} onRemove={removeFromCart} onCheckout={checkout} total={total} />
          </div>
        </div>
      )}
    </>
  )
}

export default App