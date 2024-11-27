import { useState } from 'react';
import './App.css'

// One page so we don't need routing
function App() {
  const [mewMsg, setNewMsg] = useState<string>("");

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
        <div className="msgContainer">
          <div className="titleDateContainer">
            <h3> Anonymous Farmer </h3>
            <p> 11/20/2024 </p>
          </div>
          
          <p> 
            E I E I O E I E I O E I E I O E I E I O E I E 
            I O E I E I OE I E I O E I E I O E I E I O E I 
            E I O E I E I O E I E I O E I E I O E I E I O
          </p>
        </div>
        <div className="msgContainer">
          <div className="titleDateContainer">
            <h3> Anonymous Farmer </h3>
            <p> 11/20/2024 </p>
          </div>
          
          <p> 
            E I E I O E I E I O E I E I O E I E I O E I E 
            I O E I E I OE I E I O E I E I O E I E I O E I 
            E I O E I E I O E I E I O E I E I O E I E I O
          </p>
        </div>
      </div>
      
      <form className="messageForm">
        <textarea placeholder="Old McDonalds Only" onChange={(e) =>{setNewMsg(e.target.value)}}></textarea>
        <button> Send (make this send icon) </button>
      </form>
    </>
  )
}

export default App
