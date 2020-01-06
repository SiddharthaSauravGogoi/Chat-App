import React from 'react';
import API from '../../utils/APIS'

function Login(){

    const login = event => {
        event.preventDefault();
        
        let email = event.target.email.value,
            password = event.target.password.value;

        let loginResult = API.login(email, password);
        loginResult
        .then( e => {
            if(e){
                localStorage.setItem('userToken', e.userToken)
                window.location.href = '/chat'
            }
        })
        
    }

    return(
        <div className="login-container">
            <form onSubmit={login} className="login-form">

                <div className="email-wrapper">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" required/>
                </div>
                
                <div className="password-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required/>
                </div>

                <button type="submit" className="btn-submit">
                    LOGIN
                </button>
            </form>
        </div>
    )
}

export default Login;