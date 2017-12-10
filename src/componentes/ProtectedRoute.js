import React from 'react';
import { Redirect, Route, matchPath } from 'react-router-dom';

export default class ProtectedRoute extends Route {
  
    render() {
        const resultado = matchPath(this.props.location.pathname, {path: '/timeline/:login?'});
        const isEnderecoPrivadoTimeline = resultado.params.login === undefined;
        // call some method/function that will validate if user is logged in
        if(isEnderecoPrivadoTimeline && localStorage.getItem('auth-token') === null){
            return <Redirect to="/?msg=voce precisa estar logado para acessar o endereço"></Redirect>
        }else{
            return <Route to={this.props.location.pathname} component={this.props.component} />
        }
    }
}