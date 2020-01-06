import React from 'react';
import API from '../../utils/APIS'

function Register(){

    const handleRegistration = event => {

        event.preventDefault();

        let username = event.target.username.value,
            email = event.target.email.value,
            password = event.target.password.value;


        let registerResult = API.register(username, email, password);
        registerResult.then( data => {
            if(data.msg === 'User successfully registered!'){
                window.location.href = "/login"
            }
            else{
                alert(data.msg)
            }
        })
        
    }

    return(
        <div className="register-container">
            <form onSubmit={handleRegistration} className="register-form">
                
                <div className="username-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" required/>
                </div>

                <div className="email-wrapper">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required/>
                </div>

                <div className="password-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required/>
                </div>

                <button type="submit" className="btn-submit">
                    REGISTER
                </button>
            </form>
        </div>
    )
}

export default Register;