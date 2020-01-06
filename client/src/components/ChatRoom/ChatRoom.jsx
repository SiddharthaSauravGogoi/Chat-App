import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import jwt from 'jsonwebtoken'
import emoji from 'react-emoji';

let socket;
function ChatRoom() {

    const [username, setUsername] = useState('');
    const [message, updateMessage] = useState('');
    const [messageLog, updateMessageLog] = useState([]);

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


    useEffect(() => {

        socket.on('message', (message) => {
            updateMessageLog([...messageLog, message])
        })
    }, [messageLog])


    const handleMessageSubmit = (e) => {
        e.preventDefault();

        if(e){
            socket.emit('chat', message)
            updateMessage('')
        }
    }


    return(
        <div className="chatbox-container">
            <div className="chatbox">
                <div className="chatbox-display">

                    {messageLog.map((item, key) => (

                        <div className="chat-inline" key={key}> 
                            <p className="chat-text">{emoji.emojify(item.text)}</p>
                            <p className="chat-username">  {item.user}</p>
                        </div>

                    ))}
                </div>
                <div className="chatbox-submit-wrapper">
                    <input 
                        type="text" 
                        value={message}
                        onChange={(e) => updateMessage(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' ? handleMessageSubmit(e) : null}
                    />
                    <button className="btn-submit" onClick={handleMessageSubmit}>
                        Send
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ChatRoom;