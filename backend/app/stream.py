import os
from typing import Generator
from flask import Flask, Response, request, stream_with_context
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

# This works on step 1
# http://127.0.0.1:5000/no-stream
# Content-Type application/json
# JSON Content {"content": "hi"}

# This works on step 2 in bash
# curl -d '{"content": "write me a poem"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/stream

def generate_chat_completion_stream(content: str) -> Generator[str, None, None]:
    completion = client.chat.completions.create(
        model="chatgpt-4o-latest",
        messages=[
            # System prompt
            {"role": "system", "content":"You are a helpful assistant."},
            {"role": "user", "content":content}
        ],
        # Step 2: Streaming
        stream=True
    )
    # Removed for step 2
    # return completion.choices[0].message.content

    for chunk in completion:
        # print(chunk)          This is for looking at all of the data in the chunk. All we need is the content.
        if chunk.choices[0].delta.content != None:
            yield chunk.choices[0].delta.content


@app.route("/stream", methods=['GET', 'POST'])
def handle_stream():
    if request.method == 'POST':
        body = request.get_json()

        # Step 2: Streaming
        def generate():
            for chunk in generate_chat_completion_stream(content=body["content"]):
                print(chunk)
                yield chunk
        
        # Takes my generator and returns a new generator. This new generator does two things for every item it yields:
        # 1. Before yielding: It pushes the original request context back into place, making it active.
        # 2. After yielding: It pops the context back off.
        # Ensures that while my generator is executing, it has full access to the original request context as if the request were still active.
        return Response(stream_with_context(generate()))

if __name__ == "__main__":
    app.run(
        debug=True
    )