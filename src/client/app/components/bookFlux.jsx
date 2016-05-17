import _ from 'lodash';
import { Actions, Store, Flux } from 'flummox';

class CartActions extends Actions {
  addCart(title,price) {
    return {
        title: title,
        price: price
    }
  }
}

class CartStore extends Store {

  constructor(flux) {
    super(); 

    const cartActionIds = flux.getActionIds('carts');
    this.register(cartActionIds.addCart, this.handleAddCart);
    this.state = {
      carts: [],
      totals: 0,
    };
  }

  handleAddCart(content) {
    let currentCarts = this.state.carts;
    let newCarts;
    let targetIndex = _.findIndex(this.state.carts, {title: content.title});
    if(targetIndex >= 0){
        newCarts = {
            title: content.title,
            price: content.price,
            count: (currentCarts[targetIndex].count + 1)
        }
        currentCarts[targetIndex] = newCarts;
    }else{
        newCarts = {
            title: content.title,
            price: content.price,
            count: 1
        }
        currentCarts.push(newCarts);
    }
    
    this.setState({
      carts: currentCarts
    });
    let newtotals;
    let sumtotals = 0;
    let discount = (this.state.carts.length - 1) * 10;
    newtotals = _.map(this.state.carts,(n)=> n.count * n.price);

    for(let p of newtotals){
        sumtotals += p - ((content.price * discount) / 100);
    }
    
    let netPrice = sumtotals;
    this.setState({
        totals: netPrice
    })
  }
}

class AppFlux extends Flux {
  constructor() {
    super();

    this.createActions('carts', CartActions);
    this.createStore('carts', CartStore, this);
  }
}

const flux = new AppFlux();

module.exports = flux;
