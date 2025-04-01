from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
import google.generativeai as genai # type: ignore
import time
from fastapi.responses import JSONResponse

app = FastAPI()
# Thêm middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả domain (Có thể đổi thành ["http://127.0.0.1:5500"])
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả phương thức HTTP (GET, POST, ...)
    allow_headers=["*"],  # Cho phép tất cả headers
)

API_KEY = "AIzaSyA3jY2OhfswoydnqZ7QCYXxQj6Z8K_jRtQ"
genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-1.5-pro-latest")  

@app.get("/chatbot/")
async def chatbot(question: str):
    time.sleep(2)
    response = model.generate_content(question)
    response_text = response.text
    return JSONResponse(content={"answer": response_text}, media_type="application/json", headers={"Content-Type": "application/json; charset=utf-8"})
