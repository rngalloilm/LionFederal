# LionFederal

## Run

### Fresh Pull
* ```pip install uv```.
* ```cd frontend```
* npm install
* Moving to backend ```cd ../```, ```cd backend```, and create a .env file.
* ```uv venv``` while staying in backend.
* Make sure the Python Interpreter is set to this .venv. On VS Code press ```Ctrl+Shift+P```, type ```Python: Select Interpreter```, and browse for .\.venv\Scripts\python.exe.
* ```.venv\Scripts\activate``` on Windows. ```source .venv/bin/activate``` on Mac.
* ```uv pip sync requirements.lock.txt```.

### Backend (within folder)
* Activate environment with ```.venv\Scripts\activate``` (I did it on CMD Prompt)
* Start with ```python app/stream.py``` (starts running on http://localhost:5000)
* Test the backend with this command in **bash** in the backend folder ```curl -d '{"content": "write me a poem"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/api/chat```

### Frontend (within folder)
* Start with ```npm run dev``` (starts running on http://localhost:5173)

### Dev Setup

* ```pipx install uv```
* ```cd backend```
* ```uv venv```
* ```.venv\Scripts\activate```
* ```uv pip install flask flask-cors python-dotenv openai```
* ```uv pip freeze > requirements.txt```

* Create a .env file with OpenAI key
* ```cd ../```
* ```npm create vite@latest frontend -- --template react```
* ```cd frontend```
* ```npm install```

* My switch to pyproject.toml in backend
* ```uv pip install -e .```
* ```uv pip compile pyproject.toml -o requirements.lock.txt```
* ```uv pip sync requirements.lock.txt```

## Sources

* [Flask Quickstart](https://flask.palletsprojects.com/en/stable/quickstart/)

* [OpenAI Text generation](https://platform.openai.com/docs/guides/text)

* [OpenAI Streaming](https://platform.openai.com/docs/guides/streaming-responses)

* [OpenAI Streaming API](https://platform.openai.com/docs/api-reference/responses-streaming)

* [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder)

* [TextDecoder in Chunks](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/decode)

* [Reponse Reader](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader)

* [React Reference](https://react.dev/reference/react/useRef)

* [React Reference Scrolling](https://react.dev/learn/manipulating-the-dom-with-refs)

* [Web Elements](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight)

* [Streaming ChatGPT API responses with python and JavaScript](https://dev.to/jethrolarson/streaming-chatgpt-api-responses-with-python-and-javascript-22d0)

* [How to Stream OpenAI API Responses in a Flask App](https://www.youtube.com/watch?v=z6iYcqNECwA)

* [How to Stream Data with Python Flask: Step-by-Step Tutorial](https://www.youtube.com/watch?v=6U6ognrmNsE)


## All Problems Encountered 
1. ```KeyError: 'context'``` on POST http://127.0.0.1:5000/no-stream
- Context was supposed to be content.

2. ```curl -d '{"content": "write me a poem"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/stream```  Didn't work on PowerShell or CMD.
- Do it in bash. Also, Thunder Client wont display streaming chunks.

3. Forgot to add ```from flask_cors import CORS``` in backend so the app was disfunctional.

## AI in my Process

1. Started with using AI to give me a folder structure and a five phase plan.

```
Overview: This is a weeklong project and I understand Python, React, and full-stack implementation on GitHub. My weak point is the LLM and chatbot/text-streams portion of this. I also want this response to exclude any code, as this is also a learning experience, so instead, I want you to provide me with high-level content, planning, links to relevant documentation, relevant vs code extensions, and anything else you deem helpful.

Description:
Build a single‑page React application with a Flask backend that lets a user chat with an LLM. The assistant’s response must stream token‑by‑token in real time to the UI (no spinner + big dump at the end). You’ll implement streaming end‑to‑end and design a tidy chat interface.
Deliverables
A working Flask server exposing a /api/chat endpoint that streams text as it’s generated.
A React SPA that displays a chat thread and renders the assistant reply incrementally as chunks arrive.
Clear README with setup instructions.
Github Repo(s) for the solution
```

2. Getting into the frontend, I used AI as a starting point in creating the html and css. It ended up being a super solid design.

```
Create a professional chatbot frontend interface with black and white colors. A header with a title called "Chatbot" and a navigation with only this page. Only edit the css and html. Start by deleting everything in the default css file.
```
