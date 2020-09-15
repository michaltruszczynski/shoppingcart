//feature-1
import React, { Component } from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: '',
      sort: ''
    }
  }

  createOrder = (order) => {
    alert("Need to save order for: " + order.name);
  }

  changeChandler = (event) => {
    console.log('testin gevent', event.target.value);
  }

  removeFromCart = (product) => {
    const updatedCartItems = this.state.cartItems.slice().filter(item => item._id !== product._id);
    this.setState({
      cartItems: updatedCartItems
    });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 })
    }
    this.setState({
      cartItems: cartItems
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState(state => ({
      sort: sort,
      products: state.products.slice().sort((a, b) => (
        sort === "lowest" ?
          ((a.price > b.price) ? 1 : -1) :
          sort === "highest" ?
            ((a.price < b.price) ? 1 : -1) :
            ((a._id < b._id) ? 1 : -1)
      ))
    }));
  }

  filterProducts = (event) => {
    console.log(this)
    if (event.target.value === "") {
      this.setState({
        products: data.products
      })
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0)
      });
    }
  }

  render() {
    return (
      <div className='grid-container'>
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main" onChange={this.changeChandler}>
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart} 
                createOrder={this.createOrder}/>
            </div>
          </div>
        </main>
        <footer>
          All rights is reserved
      </footer>
      </div>
    );
  }

}

export default App;
