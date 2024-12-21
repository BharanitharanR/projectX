from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Resume Parsing Backend is Running!"

if __name__ == '__main__':
    app.run(debug=True)
