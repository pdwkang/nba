import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise';


// Routes
import App from './App';
import Product from './containers/Product.js';
import Home from './containers/Home.js';
import Login from './containers/Login.js';
import Register from './containers/Register.js';
import Account from './containers/Account.js';
import Artists from './containers/Artists.js';
import MyArtwork from './containers/MyArtwork.js';
import Bracket from './containers/Bracket.js';


// Styles
import '../public/stylesheets/styles.css';


// Root Reducer
import reducers from './reducers/index.js'


import { loadState, saveState } from './localstorage.js';
const persistedState = loadState();

const store = createStore(
    reducers,
    persistedState,
    applyMiddleware(
        reduxPromise
    )
)

store.subscribe(() => {
    saveState({
        login: store.getState().login
    })
})

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="products/:id" component={Product} />
				<Route path="login" component={Login} />
				<Route path="register" component={Register} />
				<Route path="account/:username" component={Account} />
				<Route path="bracket/:username" component={Bracket} />
				<Route path="rankings" component={Artists} />
				<Route path="myArtwork" component={MyArtwork} />

			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);

// <Route path="logout" component={Logout} />