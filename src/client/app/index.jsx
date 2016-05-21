import React from 'react';
import ReactDOM from 'react-dom';
import { BookList } from './components';
import { reducers } from './redux/reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <BookList />
    </Provider>,
    document.getElementById('App')
);

