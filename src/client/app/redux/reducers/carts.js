const cart = (state , action) =>{
    switch (action.type) {
        case 'UPDATE_CART':
            if(state.productId !== action.productId){
                return state
            }
            return {
                ...state,
                amount: state.amount + 1
            }
        default:
            return state;
    }
}

const carts = (state = [] , action) =>{
    switch (action.type) {
        case 'ADD_CART':
            return [
                    ...state,
                    {
                        productId: action.productId,
                        price: action.price,
                        title: action.title,
                        amount: 1
                    }
                ] 
        case 'UPDATE_CART':
            return state.map(c => cart(c,action))
        default:
            return state;
    }    
}

module.exports = carts;
