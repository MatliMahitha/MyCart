import React from 'react'

function Cart(props) {
  const { cartItems, decQuantity, incQuantity } = props

  let sum = cartItems.reduce((a, b) =>
    a + b.price * b.quantity, 0)
    
  return (
    <div >
      <h1>Cart ({cartItems.length})</h1>
      {
        cartItems.map((cartItem, i) => {
          return <div key={i}>
            <img
              className="small"
              src={cartItem.image}
              style={{ width: 100, height: 70 }}
              alt={cartItem.name}>
            </img>
            <h3> {cartItem.name} {cartItem.quantity}kg </h3>
            <div> {`Rs.${cartItem.price * cartItem.quantity}`} </div>
            <button
              onClick={() => decQuantity(cartItem)}>
              -
            </button>
            {cartItem.quantity}
            <button
              onClick={() => incQuantity(cartItem)}>
              +
            </button>
            <hr />

          </div>
        })
      }
      <hr />
      {
        sum === 0 ?
          (<h4>Cart is empty</h4>)
          :
          (<h4>TotalPrice = Rs.{sum}</h4>)
      }
    </div>
  )
}

export default Cart
