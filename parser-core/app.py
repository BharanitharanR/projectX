import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from threading import Thread
import PyPDF2
import docx
from datetime import datetime
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# Configurations
UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'docx'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ALLOWED_EXTENSIONS'] = ALLOWED_EXTENSIONS
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

client = OpenAI()

# 
# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Helper: Allowed file extensions
def isAllowedExtension(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Helper: Asynchronous parsing
def async_parse(file_path, file_id):
    print(f"Starting parsing for file ID: {file_id}")
    parsed_content = ""
    if file_path.endswith('.pdf'):
        with open(file_path, 'rb') as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)
            parsed_content = " ".join([page.extract_text() for page in reader.pages])
    elif file_path.endswith('.docx'):
        doc = docx.Document(file_path)
        parsed_content = " ".join([paragraph.text for paragraph in doc.paragraphs])
    elif file_path.endswith('.txt'):
        with open(file_path, 'r') as txt_file:
            parsed_content = txt_file.read()
    # Simulate saving parsed content to a database or file
    print(f"Parsed content for {file_id}:\n{parsed_content[:200]}...")  # Only first 200 chars

# Upload endpoint
@app.post('/upload')
def uploadFile():
    # Check for file in request
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if not isAllowedExtension(file.filename):
        return jsonify({'error': 'File type not allowed'}), 400

    # Save the file securely
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Generate a file ID (could be a DB primary key or UUID)
    file_id = datetime.utcnow().strftime('%Y%m%d%H%M%S')

    # Start asynchronous parsing
    Thread(target=async_parse, args=(file_path, file_id)).start()

    return jsonify({'message': 'File uploaded successfully', 'file_id': file_id}), 200

# Status endpoint
@app.get('/status/<int:id>')
def getStatus(id):
    # Example response: Integrate with DB to fetch actual status
    return jsonify({'file_id': id, 'status': 'In progress'}), 200

@app.get('/chat/<query>')
def getChat(query):
    completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": query
            }
        ]
    )
    return jsonify({"response":completion})

# Get Openapi 
if __name__ == '__main__':
    app.run(debug=True)
