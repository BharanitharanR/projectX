

from flask import Flask, request, jsonify

from flask_cors import CORS
from markupsafe import escape 
from werkzeug.utils import secure_filename

import functools

app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = {'txt', 'pdf'}

app.config['ALLOWED_EXTENSIONS'] = ALLOWED_EXTENSIONS
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

        
@app.route('/data/<path:inject>')
def homeInject(inject):
    return f'{escape(inject)}'


@app.get('/status/<int:id>')
def getStatus(id):
    return jsonify(f'{escape(id)}: In progress')
    

@app.post('/upload')
def uploadFile():
    # get the file from request
    if 'file' not in request.files:
        return jsonify(404)
    files = request.files['file']
    if (files.filename == ''):
        return jsonify("505","CODE")
    if ( not isAllowedExtension(files.filename) ):
        return jsonify({'error':"Not a valid extension"}),404
    file = secure_filename(files.filename)
    contentLength = str(request.content_length)
    return contentLength 

def isAllowedExtension(filename):
    return '.' in filename and \
        filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

            
if __name__ == '__main__':
    app.run(debug=True)
