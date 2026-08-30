function Cart({ cart, onRemove, onCheckout }) {
  return(
    <div className="cart">
      {cart.map((item, index) => (
      <div className="cart-item" key={index}>
        <span>{item.name} - {item.price}$</span>
        <button className="rmv-btn" onClick={() => onRemove(index)}>Remove</button>
      </div>
    ))} 
      <button className="csh-btn" onClick={() => onCheckout()}>Confirm cash received</button>
    </div>
  )
}

export default Cart