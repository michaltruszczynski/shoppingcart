//feature-1
import React, { Component } from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: '',
      sort: ''
    }
  }

  changeChandler = (event) => {
    console.log('testin gevent', event.target.value)
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
    }))

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
      })
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
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">
              Cart Items
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
