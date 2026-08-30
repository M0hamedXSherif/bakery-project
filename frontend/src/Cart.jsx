function Cart({ cart, onRemove, onCheckout, total }) {
  return(
    <div className="cart">
      {cart.map((item, index) => (
      <div className="cart-item" key={index}>
        <button className="rmv-btn" onClick={() => onRemove(index)}>حذف</button>
        <span>{item.name} - {item.price}ج</span>
      </div>
    ))} 
      <div className="cart-total">
        <span>{total}ج</span>
        <span>:الإجمالي </span>
      </div>
      <button className="csh-btn" onClick={() => onCheckout()}>تأكيد استلام النقود</button>
    </div>
  )
}

export default Cart