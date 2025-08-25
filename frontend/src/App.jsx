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

// async returns a Promise that is a placeholder for the information I need.
// The info will come later but since I have a promise, different code can be executed.
// async lets me use the await keyword inside that function.
// await goes in front of any function that returns a Promise (like fetch). 
// await pauses the execution of the async function at that line and waits for the Promise to succeed or fail (but the app remains fully responsive).

// Submit pipline
// userMessage is added to the messages, code hits await fetch(), requests Flask server, handleSubmit pauses, 
// starts receiving the stream from OpenAI, Flask server sends back the initial response headers, fetch Promise resolves,
// handleSubmit function resumes, code enters the while (true) loop, hits await reader.read() to ask the browser for the next chunk of data from the stream,
// handleSubmit function pauses again, chunk arrives from the Flask server, reader.read() Promise resolves with the chunk of data,
// handleSubmit function resumes, chunk is decoded and appended to the last message in the messages,
// the loop goes back to the top, hits await reader.read(), and pauses, waiting for the next chunk. 
// This repeats - Pause, get chunk, update UI, resume, pause - until the stream is finished (done is true).


function App() {
  // Holds the list of messages in the chat
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! How can I help you today?' }
  ])

  // User's current input in the text field
  const [input, setInput] = useState('')

  // A ref to the chat log container for auto-scrolling
  // Initialize with null for option: manipulate the DOM
  const chatLogRef = useRef(null);

  // Effect to scroll to the bottom of the chat log whenever a new message is added (when the 'messages' array changes)
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userMessage = input.trim();

    // Don't submit if the input is empty
    if (!userMessage) return;

    // 1. Add the user's message to the chat log immediately
    const updatedMessages = [...messages, { role: 'user', content: userMessage }]; // Effectively appending the new message
    setMessages(updatedMessages); // Adds updatedMessages to the queue of changes
    setInput('');

    // 2. Add a placeholder for the bot's response
    // Also adding changes to the queue but must use an updater function form => in order to see the updatedMessages changes while staying in line
    setMessages(prevMessages => [...prevMessages, {role: 'bot', content: ''}]);

    // Send the user's message to the Flask server
    const response = await fetch("http://127.0.0.1:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({content: userMessage})
    });

    // Tools needed to read a response stream chunk by chunk
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    // 3. Stream the response and update the bot's message in place
    while (true) {
      // Pause execution until a chunk is received from the stream
      const { done, value } = await reader.read();

      // Exit the loop when the stream is consumed
      if (done) break;

      // Convert from binary to string
      const chunk = decoder.decode(value, { stream: true });

      // Get the most recent state
      setMessages(currentMessages => {
        // Get the last message (the bot's placeholder)
        const lastMessage = currentMessages[currentMessages.length - 1];

        // New message object by appending the new chunk to the old content
        const updatedLastMessage = {...lastMessage, content: lastMessage.content + chunk};

        // Return a new array with the last message replaced by the updated version
        return [...currentMessages.slice(0, -1), updatedLastMessage];
      })
    }
  }

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
      {/*  ref={chatLogRef} */}
      <main id="chat-log">
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
