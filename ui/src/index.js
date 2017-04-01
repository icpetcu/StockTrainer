import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';

import './styles/w3.css';
import './styles/custom.css';


const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    )
};


render(App);
if (module.hot) module.hot.accept('./components/App', () => render(App));
