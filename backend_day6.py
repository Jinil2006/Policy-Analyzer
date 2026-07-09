# Day 6 - Backend for PDF Extraction
from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import os

app = Flask(__name__)
CORS(app) # Day 6 - Enable CORS for all routes

@app.route('/analyze', methods=['POST'])
def analyze_pdf():
    # Day 6 - Extract PDF Text Logic
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and file.filename.endswith('.pdf'):
        try:
            # Save the file temporarily
            temp_path = os.path.join(os.getcwd(), file.filename)
            file.save(temp_path)

            extracted_text = ""
            # Day 6 - Use pdfplumber for text extraction
            with pdfplumber.open(temp_path) as pdf:
                for page in pdf.pages:
                    text = page.extract_text()
                    if text:
                        extracted_text += text + "\n"
            
            # Day 6 - Print extracted text to server console
            print("--- Extracted PDF Text (Day 6) ---")
            print(extracted_text)
            print("----------------------------------")

            # Clean up the temporary file
            if os.path.exists(temp_path):
                os.remove(temp_path)

            return jsonify({'message': 'Text extracted successfully', 'text': extracted_text}), 200
        except Exception as e:
            # Clean up the temporary file in case of error
            path_to_clean = os.path.join(os.getcwd(), file.filename)
            if 'temp_path' in locals() and os.path.exists(temp_path):
                os.remove(temp_path)
            elif os.path.exists(path_to_clean):
                 os.remove(path_to_clean)
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Please upload a valid PDF file'}), 400

if __name__ == '__main__':
    # Day 6 - Run the server
    app.run(debug=True, port=5001)

