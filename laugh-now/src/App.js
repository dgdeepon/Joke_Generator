import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState('');
  const [inputText, setInputText] = useState('');
  const [generating,setGenerate]=useState(false);

  useEffect(() => {

  }, [messages,generating]);

  const sendMessage = () => {
    setGenerate(true);
    axios
      .post(process.env.REACT_APP_API,{"message":inputText})
      .then((response) => {
        // console.log(response);
        setGenerate(false);
        setMessages(`${response.data.message}`);
      })
      .catch((error) => {
        setGenerate(false);
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>LAUGH NOW</h1>
      <div className='message-list'>
        { generating ? <p className='message-item'>Generating...</p>: messages ?
            <p className="message-item">Read & Laugh : {messages}</p> : ''
        }
      </div>
      <div className="input-container">
        <input
        className='input-field'
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder='Keyword for the joke...'
          required
        />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
}

export default App;
