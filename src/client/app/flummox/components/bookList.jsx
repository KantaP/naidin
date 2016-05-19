import React from 'react';
import BookFlux from './bookFlux.jsx';

export default class BookList extends React.Component{
   
    constructor(props){
        super(props);
        this.state = {
            books:[
                {title:'Harry Potter 1',path:'img/harry1.jpg',price:100},
                {title:'Harry Potter 2',path:'img/harry2.jpg',price:100},
                {title:'Harry Potter 3',path:'img/harry3.jpg',price:100},
                {title:'Harry Potter 4',path:'img/harry4.jpg',price:100},
                {title:'Harry Potter 5',path:'img/harry5.jpg',price:100},
                {title:'Harry Potter 6',path:'img/harry6.jpg',price:100},
                {title:'Harry Potter 7',path:'img/harry7.jpg',price:100}
            ],
            totals: 0,
            cartList: []
        };
    }
    addCart(title,price){
        BookFlux.getActions('carts').addCart(title,price);
        this.setState({totals: BookFlux.getStore('carts').state.totals});
        this.setState({cartList: BookFlux.getStore('carts').state.carts})
    }
    render(){
        let display = {
            display: 'flex',
            flexFlow: 'row wrap'
        }
        let margin = {
            marginRight:10
        }
        return <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset">
                            <h1>Harry Potter Sells</h1>
                            <div>
                                <div id="sc" className="icon material-icons pull-left" style={margin}>
                                    add_shopping_cart
                                </div>
                                <div className="mdl-tooltip" htmlFor="sc">
                                    <ul className="demo-list-icon mdl-list">
                                        {
                                            this.state.cartList.map((c,index)=>{
                                                return <li className="mdl-list__item" key={index}>
                                                        <span className="mdl-list__item-primary-content">
                                                            <i className="material-icons mdl-list__item-icon">book</i>
                                                            {c.title}
                                                        </span>
                                                        <span class="mdl-list__item-sub-title">{c.count} copies</span>
                                                      </li>
                                            })
                                        }
                                    </ul>
                                </div>
                                <h4>{this.state.totals} THB</h4>
                            </div>   
                        </div>
                        <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset"  style={display}>
                        {
                            this.state.books.map((d,index)=>{
                                let background = {
                                    background: `url('${d.path}') bottom 50% right 10% no-repeat #FFC200`
                                }
                                return <div className="demo-card-square mdl-card mdl-shadow--2dp" key={index}>
                                            <div className="mdl-card__title mdl-card--expand" style={background}>
                                                <h2 className="mdl-card__title-text">{d.title}</h2>
                                            </div>
                                            <div className="mdl-card__supporting-text">
                                                <span className="pull-left">Price : {d.price} THB</span>
                                                <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab pull-right mdl-deep-orange"
                                                onClick={this.addCart.bind(this,d.title,d.price)}>
                                                    <i className="material-icons">add</i>
                                                </button>
                                            </div>
                                        </div>
                            })
                        }
                    </div>
                </div>
        
    }
}


