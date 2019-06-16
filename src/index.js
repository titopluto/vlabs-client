import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
// Import Extra styles for Dashboard and Monitorboard components etc
import './index.css';
import App from './App';
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

window.React = React


ReactDOM.render(<App />, document.getElementById('root'));
// disable ServiceWorker
// registerServiceWorker();
