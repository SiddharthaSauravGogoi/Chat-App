import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import jwt from 'jsonwebtoken'

function ChatRoom() {

    const [username, setUsername] = useState('')

    let socket;

    useEffect(() => {

        let token = localStorage.getItem('userToken')
        let userDetails = jwt.decode(token)
        let { username } = userDetails
        setUsername(username)
        socket = io('http://localhost:3600')

        socket.emit('login', {username})

        return () => {
            socket.off();
        }

    }, [])
    return(
        <div>
            Chat page goes here
        </div>
    )
}

export default ChatRoom;