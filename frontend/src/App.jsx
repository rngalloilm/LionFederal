import './App.css'
import { useState, useRef, useEffect } from 'react';

// useState gives a component its own memory.
// messages holds the array of chat messages.
// Calling setMessages with a new value has React automatically re-render, opposed to touching DOM.
// Also using it for input and updating as the user types.

// Declarative Rendering is used in the HTML to map the state array directly to JSX elements.
// For every message there is a div.

// useRef is a ref giving us a way to get a direct reference to a DOM element without querying for it. 
// To get a handle on the <main> chat log container.


function App() {
  // Holds the list of messages in the chat
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! How can I help you today?' }
  ])

  // User's current input in the text field
  const [input, setInput] = useState('')

  // A ref to the chat log container for auto-scrolling

  // Effect to scroll to the bottom of the chat log whenever a new message is added (when the 'messages' array changes)

  // Handle submit

    // Don't submit if the input is empty

    // 1. Add the user's message to the chat log immediately

    // 2. Add a placeholder for the bot's response

    // Send the user's message to the Flask server

    // 3. Stream the response and update the bot's message in place

      // Get the last message (the bot's placeholder)

      // Append the new chunk to its content

      // Replace the old last message with the updated one

  return (
    <>
      <header className="app-header">
        <h1>Chatbot</h1>
        <nav>
          <ul>
            <li><a href="#" className="active">Chat</a></li>
          </ul>
        </nav>
      </header>
      
      {/* Chat log renders dynamically from the 'messages' state */}
      <main id="chat-log" ref={chatLogRef}>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            <p>{message.content}</p>
          </div>
        ))}
      </main>

      {/* Form controlled by state and event handlers */}
      <form id="chat-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          id="message" 
          name="message" 
          placeholder="Type your message here..." 
          autoComplete="off"
          value={input} // Bound to the 'input' state
          onChange={(e) => setInput(e.target.value)} // Typing updates the 'input' state
        />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default App
