import { useState, useEffect, FormEvent, useRef } from 'react';
import './App.css';

import io, { Socket } from 'socket.io-client';
import { TbSend2 } from "react-icons/tb";
import { GiFarmTractor } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";

import farmerPfp from "./assets/farmerpfp.png";

const SOCKET_URL = 'https://acoustic-lopsided-larch.glitch.me';

// One page so we don't need routing
function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newMsg, setNewMsg] = useState<string>("");
  const [messages, setMessages] = useState<{ content: string, date: string }[]>([]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);  // Array of messages

  useEffect(() => {
    // Fetch all messages from MongoDB using the new endpoint
    const fetchMessages = async () => {
      try {
          const response = await fetch('https://acoustic-lopsided-larch.glitch.me/messages');
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


  useEffect(() => {
    // Scroll to the last message whenever the messages array is updated
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();

    // regex to check if input only has eio and spaces included
    const isValid = /^[eioEIO\s]*$/.test(newMsg); 
    
    if (!isValid) {
        alert("Message can only contain the letters E, I, or O.");
        return;
    }

    if (newMsg.trim() !== '' && socket) {
        // sends msg to server 
        socket.emit('message', newMsg);
        console.log("new message  has been sent")
        setNewMsg(" "); // Clear the input after sending
    }
  };

  return (
    <div className='fullPageContainer'>
      <div className="pageContainer">
        <div className="lyricsContainer">
        <p>
          Old MacDonald had a farm <br />
          Ee i ee i o <br />
          And on his farm he had some cows <br />
          Ee i ee i o <br />
          With a moo-moo here <br />
          And a moo-moo there <br />
          Here a moo, there a moo <br />
          Everywhere a moo-moo <br />
          Old MacDonald had a farm <br />
          Ee i ee i o <br />
          Old MacDonald had a farm <br />
          Ee i ee i o <br />
          And on his farm he had some chicks <br />
          Ee i ee i o <br />
          With a cluck-cluck here <br />
          And a cluck-cluck there <br />
          Here a cluck, there a cluck <br />
          Everywhere a cluck-cluck <br />
          Old MacDonald had a farm <br />
          Ee i ee i o <br />
          Old MacDonald had a farm <br />
          Ee i ee i o <br />
          And on his farm he had some pigs <br />
          Ee i ee i o <br />
          With an oink-oink here <br />
          And an oink-oink there <br />
          Here an oink, there an oink <br />
          Everywhere an oink-oink <br />
          Old MacDonald had a farm <br />
          Ee i ee i o <br />
        </p>
        </div>
        <div className="chatContainer">
          <header>
            <div className="titleContainer">
              <h1> Old Mac's Global Chat! </h1>
              <GiFarmTractor id="tractorIcon"/>
            </div>
            <p> 
              Send a message using only E-I-E-I-O. 
              We are on Old MacDonald's farm! 
            </p>
          </header>
          
          <div className="allMsgContainer">
              {messages.map((msg, index) => (
                <div className="msgContainer" key={index}>
                  <div className="pfpNameContainer">
                    <img className="farmerPfp" src={farmerPfp} alt="farmerpfp"/>
                    <div className="titleDateContainer">
                      <h3> Anonymous Farmer </h3>
                      <p> {msg.date} </p>
                    </div>
                  </div>
                  <p>
                    {msg.content}
                  </p>
                </div>
              ))}
              <div ref={lastMessageRef} />
          </div>
          
          <form className="messageForm">
            <textarea 
              placeholder="Old McDonalds Only" 
              value={newMsg} 
              onChange={(e) =>{setNewMsg(e.target.value)}}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Prevent newline
                  handleSendMessage(e); // Trigger send message
                }
              }}
            ></textarea>
            <TbSend2 id="sendIcon" onClick={handleSendMessage}/>
          </form>
        </div>
      </div>
      <footer>
        @ 2024 Pauleena Phan. All rights reserved
        <a href="https://github.com/pauleenaphan/Old-Mac-s-Chat" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </footer>
    </div>
  )
}

export default App
