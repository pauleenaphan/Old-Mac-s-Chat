import { useState, useEffect, FormEvent } from 'react';
import './App.css';

import io, { Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001';
// One page so we don't need routing
function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newMsg, setNewMsg] = useState<string>("");
  const [messages, setMessages] = useState<{ content: string, date: string }[]>([]); // Array of messages

  useEffect(() => {
    // Fetch all messages from MongoDB using the new endpoint
    const fetchMessages = async () => {
      try {
          const response = await fetch('http://localhost:3001/messages');
          const data = await response.json();
          setMessages(data); // Store the fetched messages in state
      } catch (error) {
          console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Creates socket connection
    const socketInstance = io(SOCKET_URL);

    // listens for any messages
    socketInstance.on('message', (msg: { content: string, date: string }) => {
      console.log('New message received from server:', msg); // Debug log
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    setSocket(socketInstance);

    // cleans up socket
    return () => {
        socketInstance.disconnect();
    };
  }, []);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (newMsg.trim() !== '' && socket) {
        // sends msg to server 
        socket.emit('message', newMsg);
        console.log("new message  has been sent")
        setNewMsg(" "); // Clear the input after sending
    }
  };

  return (
    <>
      <header>
        <h1> Old Mac's Chat! </h1>
        <p> 
          Send a message using only E-I-E-I-O. 
          We are on Old MacDonald's farm! 
        </p>
      </header>
      
      <div className="allMsgContainer">
          {messages.map((msg, index) => (
            <div className="msgContainer" key={index}>
                <div className="titleDateContainer">
                  <h3> Anonymous Farmer </h3>
                  <p> {msg.date} </p>
                </div>
                <p>
                  {msg.content}
                </p>

            </div>
          ))}
      </div>
      
      <form className="messageForm" onSubmit={handleSendMessage}>
        <textarea placeholder="Old McDonalds Only" value={newMsg} onChange={(e) =>{setNewMsg(e.target.value)}}></textarea>
        <button> Send (make this send icon) </button>
      </form>
    </>
  )
}

export default App
