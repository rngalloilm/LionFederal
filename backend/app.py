import os
from flask import Flask, request
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__)

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

@app.get("/")
def handle_home():
    return "Ok", 200

def generate_chat_completion(content: str) -> str:
    completion = client.chat.completions.create(
        model="chatgpt-4o-latest",
        messages=[
            # System prompt
            {"role": "system", "content":"You are a helpful assistant."},
            {"role": "user", "content":content}
        ]
    )
    return completion.choices[0].message.content

@app.post("/no-stream")
def handle_no_stream():
    body = request.get_json()

    response = generate_chat_completion(content=body["content"])
    return response, 200

if __name__ == "__main__":
    app.run(
        debug=True
    )