from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import together
import googlemaps
from datetime import datetime

# 載入環境變數
load_dotenv()

app = Flask(__name__)
CORS(app)

# 設定 API Keys
together.api_key = os.getenv("TOGETHER_API_KEY")
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
        
        response = together.Complete.create(
            prompt=prompt,
            model="mistral-7b-instruct-v0.2",
            max_tokens=1000,
            temperature=0.7
        )
        
        return jsonify({
            "success": True,
            "copies": response.output.text.split("\n\n")
        })
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