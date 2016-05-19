import carts from './carts';
import { combineReducers } from 'redux';

const bookApp = combineReducers({
    carts
})

module.exports = bookApp;