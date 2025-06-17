from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
import googlemaps
from datetime import datetime

# 載入環境變數
load_dotenv()

app = Flask(__name__)
CORS(app)

# 設定 API Keys
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
TOGETHER_API_URL = "https://api.together.xyz/inference"
gmaps = googlemaps.Client(key=os.getenv("GOOGLE_MAPS_API_KEY"))

@app.route("/api/generate-copy", methods=["POST"])
def generate_copy():
    try:
        data = request.json
        prompt = f"""請為以下活動生成三種不同風格的宣傳文案：
        活動名稱：{data.get('title')}
        日期時間：{data.get('datetime')}
        地點：{data.get('location')}
        活動描述：{data.get('description')}
        """
        
        # 使用 Together API
        response = requests.post(
            TOGETHER_API_URL,
            headers={
                "Authorization": f"Bearer {TOGETHER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "mistral-7b-instruct-v0.2",
                "prompt": prompt,
                "max_tokens": 1000,
                "temperature": 0.7,
                "top_p": 0.7,
                "top_k": 50,
                "repetition_penalty": 1
            }
        )
        
        if response.status_code == 200:
            result = response.json()
            generated_text = result.get('output', {}).get('text', '')
            return jsonify({
                "success": True,
                "copies": [text.strip() for text in generated_text.split("\n\n") if text.strip()]
            })
        else:
            return jsonify({
                "success": False,
                "error": f"API error: {response.status_code}"
            }), 500
            
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route("/api/location-details", methods=["GET"])
def get_location_details():
    try:
        address = request.args.get("address")
        if not address:
            return jsonify({"error": "Address is required"}), 400
            
        result = gmaps.geocode(address)
        if result:
            location = result[0]["geometry"]["location"]
            return jsonify({
                "success": True,
                "location": location,
                "formatted_address": result[0]["formatted_address"]
            })
        return jsonify({"error": "Location not found"}), 404
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route("/api/generate-form", methods=["POST"])
def generate_form():
    # TODO: 實作 Google Form 生成邏輯
    return jsonify({
        "success": True,
        "message": "Form generation endpoint (to be implemented)"
    })

if __name__ == "__main__":
    app.run(debug=True) 