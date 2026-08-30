function Cart({ cart, onRemove, onCheckout, total }) {
  return(
    <div className="cart">
      {cart.map((item, index) => (
      <div className="cart-item" key={index}>
        <span>{item.name} - {item.price}ج</span>
        <button className="rmv-btn" onClick={() => onRemove(index)}>Remove</button>
      </div>
    ))} 
      <div className="cart-total">
        <span>الإجمالي: </span>
        <span>{total}ج</span>
      </div>
      <button className="csh-btn" onClick={() => onCheckout()}>Confirm cash received</button>
    </div>
  )
}

export default Cart