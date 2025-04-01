import requests # type: ignore

API_KEY = "AIzaSyA3jY2OhfswoydnqZ7QCYXxQj6Z8K_jRtQ"

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key={API_KEY}"
data = {"contents": [{"parts": [{"text": "Test API quota"}]}]}

response = requests.post(url, json=data)

if response.status_code == 200:
    print("✅ API hoạt động bình thường!")
elif response.status_code == 429:
    print("⛔ Quota đã hết, cần đợi hoặc tạo API key mới.")
elif response.status_code == 403:
    print("❌ API Key không hợp lệ hoặc đã hết hạn.")
else:
    print(f"⚠️ Lỗi khác: {response.json()}")
