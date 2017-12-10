import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import ProtectedRoute from './componentes/ProtectedRoute';
import './css/timeline.css';
import './css/reset.css';
import './css/login.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { timeline } from './reducers/timeline';
import { notificacao } from './reducers/header';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

const reducers = combineReducers({timeline, notificacao});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <ProtectedRoute path='/timeline/:login?' component={App}/>
                    <Route path="/logout" component={Logout}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
