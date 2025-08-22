# LionFederal

### AI assisted setup
* --
* PS pipx install uv
* PS cd backend
* PS uv venv
* PS .venv\Scripts\activate
* PS uv pip install flask flask-cors python-dotenv openai
* PS uv pip freeze > requirements.txt
* --
* Create a .env file with OpenAI key
* PS cd ../
* PS npm create vite@latest frontend -- --template react
* PS cd frontend
* PS npm install
* --
* My switch to pyprojectoml in backend
* PS uv pip install -e .
* PS uv pip compile pyproject.toml -o requirements.lock.txt
* PS uv pip sync requirements.lock.txt

## Sources

### Part 1

* [Flask Quickstart](https://flask.palletsprojects.com/en/stable/quickstart/)

* [OpenAI Text generation](https://platform.openai.com/docs/guides/text)

* [Streaming ChatGPT API responses with python and JavaScript](https://dev.to/jethrolarson/streaming-chatgpt-api-responses-with-python-and-javascript-22d0)

* [How to Stream OpenAI API Responses in a Flask App](https://www.youtube.com/watch?v=z6iYcqNECwA)

* [Streaming AI Responses with Flask: A Practical Guide](https://medium.com/@mr.murga/streaming-ai-responses-with-flask-a-practical-guide-677c15e82cdd)

* [How to Stream Data with Python Flask: Step-by-Step Tutorial](https://www.youtube.com/watch?v=6U6ognrmNsE)


## Errors encountered 

* KeyError: 'context' - on POST http://127.0.0.1:5000/no-stream