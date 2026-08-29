import { useState } from "react";
import ProductCard from './ProductCard.jsx'
import './App.css'


const products = [
  {id: 1, address: "../public/cr.jpg",                   alt: "Croissant",     name: "Croissant",     price: 60,  instock: true},
  {id: 2, address: "https://en.wikipedia.org/wiki/Danish_pastry",                                alt: "Danish Pastry", name: "Danish Pastry", price: 120, instock: false},
  {id: 3, address: "https://ratiosbakery.com/products/palmier",                                  alt: "Palmier",       name: "Palmier",       price: 220, instock: true},
  {id: 4, address: "https://www.freshchoice.co.nz/recipes/traditional-chunky-pepper-beef-pies/", alt: "Meat Pies",     name: "Meat Pies",     price: 370, instock: true},
]


function App() {

  const [cart, setCart] = useState([])
  
  function addToCart(product) {
    setCart([...cart, product])
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return(
    <>
      <p>Total: ${total}</p>
      <section>
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
    </>
  )
}

export default App