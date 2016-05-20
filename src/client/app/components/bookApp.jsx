import React , { Component } from 'react';

const books = [
    {productId:1,title:'Harry Potter 1',path:'img/harry1.jpg',price:100},
    {productId:2,title:'Harry Potter 2',path:'img/harry2.jpg',price:100},
    {productId:3,title:'Harry Potter 3',path:'img/harry3.jpg',price:100},
    {productId:4,title:'Harry Potter 4',path:'img/harry4.jpg',price:100},
    {productId:5,title:'Harry Potter 5',path:'img/harry5.jpg',price:100},
    {productId:6,title:'Harry Potter 6',path:'img/harry6.jpg',price:100},
    {productId:7,title:'Harry Potter 7',path:'img/harry7.jpg',price:100}
];

export class BookList extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const { store } = this.context;
        this.unsubscribe = store.subscribe(()=>{
            this.forceUpdate();
        })
    }
    componentWillUnmount(){
        this.unsubscribe();
    }
    render(){
        const { store } = this.context;
        const state = store.getState();
        let newtotals;
        let sumtotals = 0;
        let discount = (state.carts.length - 1) * 10;
        newtotals = state.carts.map(n => (n.amount * n.price) - (((n.amount * n.price) * discount) / 100));
        for(let p of newtotals){
            sumtotals += p ;
        }
        let display = {
            display: 'flex',
            flexFlow: 'row wrap'
        }
        let margin = {
            marginRight:10
        }
        return (<div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset">
                            <h1>Harry Potter Sells</h1>
                            <div>
                                <div id="sc" className="icon material-icons pull-left" style={margin}>
                                    add_shopping_cart
                                </div>
                                <div className="mdl-tooltip" htmlFor="sc">
                                    <ul className="demo-list-icon mdl-list">
                                        {
                                            state.carts.map((c,index)=>{
                                                return <li className="mdl-list__item" key={c.productId}>
                                                        <span className="mdl-list__item-primary-content">
                                                            <i className="material-icons mdl-list__item-icon">book</i>
                                                            {c.title}
                                                        </span>
                                                        <span className="mdl-list__item-sub-title">{c.amount} copies</span>
                                                      </li>
                                            })
                                        }
                                    </ul>
                                </div>
                                <h4>{sumtotals} THB</h4>
                            </div>   
                        </div>
                        <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset"  style={display}>
                        {
                            books.map((d,index)=>{
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
                                                onClick={
                                                    () =>{
                                                        let exist = state.carts.find(c =>{
                                                            return c.productId === d.productId
                                                        })
                                                        if(exist){
                                                            store.dispatch({
                                                                type: 'UPDATE_CART',
                                                                productId: d.productId
                                                            })
                                                        }else{
                                                            store.dispatch({
                                                                type: 'ADD_CART',
                                                                productId: d.productId,
                                                                price: d.price,
                                                                title: d.title
                                                            })
                                                        }
                                                    }
                                                }>
                                                    <i className="material-icons">add</i>
                                                </button>
                                            </div>
                                        </div>
                            })
                        }
                    </div>
                </div>)
    }
}

BookList.contextTypes = {
    store: React.PropTypes.object
}