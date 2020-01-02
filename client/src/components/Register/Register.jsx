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
        <div>
            <form onSubmit={handleRegistration}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" required/>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" required/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" required/>

                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Register;