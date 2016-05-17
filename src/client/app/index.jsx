import React from 'react';
import ReactDOM from 'react-dom';
import BookList from './components/bookList.jsx';

class App extends React.Component{
    render(){
        
        return(
            <BookList />
        )
    }
}

ReactDOM.render(<App />,document.getElementById('App'));