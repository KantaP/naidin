import React from 'react';
import ReactDOM from 'react-dom';
import { store as BookStore, BookList} from './components/bookApp.jsx';

const render = () => {
    let newtotals;
    let sumtotals = 0;
    let discount = (BookStore.getState().carts.length - 1) * 10;
    newtotals = BookStore.getState().carts.map(n => (n.amount * n.price) - ((n.amount * n.price) * discount) / 100);
    for(let p of newtotals){
        sumtotals += p ;
    }
    ReactDOM.render(
        <BookList 
            carts={BookStore.getState().carts}
            total={sumtotals}
        />,
        document.getElementById('App')
    );
}

BookStore.subscribe(render);
render();

