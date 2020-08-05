import React from 'react';
import './App.scss';
import Main from './containers/Main';
import News from './containers/News';
import Resouces from './containers/Resoucres';
import Footer from './containers/Footer';

function App() {
    return (
        <div className='app'>
            <Main />
            <News />
            <Resouces />
            <Footer />
        </div>
    );
}

export default App;
