import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import ChatRoom from './components/ChatRoom/ChatRoom'

const routes = (
		<Router>
			<div>
				<Route exact path= "/" component={App} />
				<Route exact path= "/login" component={Login} />
				<Route exact path= "/register" component={Register} />
				<Route exact path= "/chat" component={ChatRoom} />
			</div>
		</Router>
);


ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
