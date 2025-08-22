# LionFederal

## Run

### Backend (within folder)
* Activate environment with ```.venv\Scripts\activate``` (I did it on CMD Prompt)
* Start with ```python stream.py``` (starts running on http://localhost:5000)
* Test the backend with this command in **bash** in the backend folder ```curl -d '{"content": "write me a poem"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/stream```

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

* [Streaming ChatGPT API responses with python and JavaScript](https://dev.to/jethrolarson/streaming-chatgpt-api-responses-with-python-and-javascript-22d0)

* [How to Stream OpenAI API Responses in a Flask App](https://www.youtube.com/watch?v=z6iYcqNECwA)

* [Streaming AI Responses with Flask: A Practical Guide](https://medium.com/@mr.murga/streaming-ai-responses-with-flask-a-practical-guide-677c15e82cdd)

* [How to Stream Data with Python Flask: Step-by-Step Tutorial](https://www.youtube.com/watch?v=6U6ognrmNsE)


## All Problems Encountered 
1. ```KeyError: 'context'``` on POST http://127.0.0.1:5000/no-stream
- Context was supposed to be content.

2. ```curl -d '{"content": "write me a poem"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/stream```  Didn't work on PowerShell or CMD.
- Do it in bash. Also, Thunder Client wont display streaming chunks.