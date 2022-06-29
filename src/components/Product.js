import { React, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import swal from 'sweetalert'
import Cart from './Cart'

function Product() {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Tomatoes',
      price: 34,
      quantity: 5,
      image: "https://www.bing.com/th?id=OIP.Gg9oVDFiEkHY7EtjvhALXwHaDs&w=349&h=174&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"
    },
    {
      id: '2',
      name: 'Chillies',
      price: 24,
      quantity: 5,
      image: "https://th.bing.com/th/id/OIP.BSStHxeqlMlUHQ0T7ZpcDwHaEK?w=333&h=187&c=7&r=0&o=5&dpr=2&pid=1.7"
    },
    {
      id: '3',
      name: 'onions',
      price: 44,
      quantity: 5,
      image: "https://www.bing.com/th?id=OIP.oxgjuB604oN7vQQRDumIAgHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"
    },
    {
      id: '4',
      name: 'potatos',
      price: 14,
      quantity: 5,
      image: "https://www.bing.com/th?id=ODL.c83081dc3ebb938451a5d2ee3fcede29&w=197&h=112&c=7&rs=1&qlt=80&o=6&dpr=2&pid=RichNav"
    },
    {
      id: '5',
      name: 'carrot',
      price: 46,
      quantity: 5,
      image: "https://www.bing.com/th?id=OIP.4C3v3ExBEap1_9TF92vTSgHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"
    },
    {
      id: '6',
      name: 'beetroot',
      price: 45,
      quantity: 5,
      image: "https://www.bing.com/th?id=OIP.spsKkO6D7VXRI6CBxchthgHaE1&w=309&h=201&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"
    },
  ])

  const alertMe = (product) => {
    swal(`${product.name} - 'Out Of Stock'`)
  }

  products.map((product) => {
    return (product.quantity <= 0) && alertMe(product)
  })

  const [cartItems, setCartItems] = useState([])
  const [select, setSelect] = useState(1)

  const addProduct = (product) => {
    const result = cartItems.filter(item =>
      item.id === product.id)
    if (result.length > 0) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ?
          { ...item, quantity: item.quantity + Number(select) } :
          { ...item }))
    } else {
      setCartItems([...cartItems, { ...product, quantity: Number(select) }])
    }
    decTotalQuantity(product, select)
  }

  const decTotalQuantity = (selectedProduct, selectedQuantity) => {
    setProducts(products.map((item) => {
      if (item.id === selectedProduct.id) {
        return { ...item, quantity: item.quantity - selectedQuantity }
      } else {
        return item
      }
    }))
  }

  const decQuantity = (cartItem) => {
    const result = cartItems.find(it =>
      it.id === cartItem.id)
    if (result.quantity === 1) {
      setCartItems(cartItems.filter(fi =>
        fi.id !== cartItem.id))
    } else {
      setCartItems(cartItems.map(item =>
        item.id === cartItem.id ?
          { ...item, quantity: item.quantity - 1 } :
          { ...item }))
    }

  }

  const handleChange = (e, product) => {
    setSelect(e.target.value)
  }

  return (
    <Container className="shadow mb-5 p-2 rounded" >
      <Row >
        <Col xs={12} md={7}  >
          <h1>PRODUCTS</h1>
          <div class="row row-cols-1-hover row-cols-md-3 g-4">
            {
              products.map((product, i) => {
                return <div key={i} class="col">
                  <div key={i} class="card-group">
                    <div class="card h-800">
                      <img src={product.image}
                        style={{ width: 197, height: 100 }}
                        class="card-img-top"
                        alt={product.name}>
                      </img>
                      <div class="card-body">
                        <h5 class="card-title"> {product.name} </h5>
                        <p class="card-text"> {`Rs. ${product.price * select}`} </p>
                        <select className="m-2" onChange={(e) => { handleChange(e, product) }} >
                          <option value="1">{`1kg-Rs.${product.price * 1}`}</option>
                          <option value="2">{`2kg-Rs.${product.price * 2}`}</option>
                          <option value="3">{`3kg-Rs.${product.price * 3}`}</option>
                          <option value="4">{`4kg-Rs.${product.price * 4}`}</option>
                          <option value="5">{`5kg-Rs.${product.price * 5}`}</option>
                        </select>
                        <Button
                          variant="outline-primary"
                          onClick={() => { addProduct(product) }}>
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </Col>
        <Col xs={6} md={4}>
          <Cart cartItems={cartItems}
            decQuantity={decQuantity}
            incQuantity={addProduct} />
        </Col>
      </Row>
    </Container>
  )
}

export default Product