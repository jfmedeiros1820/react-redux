import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { parse } from 'query-string';

class Login extends Component {

    constructor(props) {
        super(props);
        const search = parse(this.props.location.search);
        this.state = {
            msg: search.msg
        };

        this.envia = this.envia.bind(this);
    }

    envia(event) {
        event.preventDefault();
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({login:this.login.value, senha:this.senha.value}),
            headers: new Headers({
                'Content-type':'application/json'
            })
        }
        fetch('http://localhost:8080/api/public/login', requestInfo)
            .then(response => {
                if(response.ok) {
                    return response.text();
                } else {
                    this.setState({msg: 'não foi possível fazer login'})
                    throw new Error('não foi possível fazer login')
                }
            })
            .then(token => {
                localStorage.setItem('auth-token', token);
                this.props.history.push("/timeline");
            })
            .catch(error => this.setState({msg: error.message}));
    }
    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia}>
                    <input type="text" ref={(input) => this.login = input}/>
                    <input type="password" ref={(input) => this.senha = input}/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);