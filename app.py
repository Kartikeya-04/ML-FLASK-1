
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

model = pickle.load(open('model.pkl', 'rb'))

@app.route('/submit', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        data = dict(data)
        print("Received data:", data) 
        print('done1')
        height = float(data['height'])
        
        print('done2')

        prediction = model.predict([[height]])
        print('done3')

        # output = np.round(prediction[0], 2)
        output = prediction.tolist()
        



        return jsonify({'prediction': output})
    except KeyError:
        return jsonify({'error': 'Missing or incorrect data format. Expected JSON object with "height" key.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=4000)
