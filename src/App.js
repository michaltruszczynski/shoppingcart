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

  sortProducts = () => {

  }

  render() {
    return (
      <div className='grid-container'>
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
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
