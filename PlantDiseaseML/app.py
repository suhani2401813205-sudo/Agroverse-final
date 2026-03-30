import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
from flask import Flask, request, jsonify, render_template
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)

# Load model
model = tf.keras.models.load_model("models/mobilenet_model.h5", compile=False)

# Class labels
classes = [
    "Pepper Bell Bacterial Spot",
    "Pepper Bell Healthy",
    "Potato Early Blight",
    "Potato Healthy",
    "Potato Late Blight",
    "Tomato Target Spot",
    "Tomato Mosaic Virus",
    "Tomato Yellow Leaf Curl Virus",
    "Tomato Bacterial Spot",
    "Tomato Early Blight",
    "Tomato Healthy",
    "Tomato Late Blight",
    "Tomato Leaf Mold",
    "Tomato Septoria Leaf Spot",
    "Tomato Spider Mites"
]

# Prediction route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        file = request.files["file"]
        if not file:
            return jsonify({"error": "No file uploaded"}), 400

        img_path = "temp.jpg"
        file.save(img_path)

        # Preprocess image
        img = image.load_img(img_path, target_size=(128, 128))  #  correct
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Predict
        prediction = model.predict(img_array)
        top_indices = prediction[0].argsort()[-3:][::-1]
        top_preds = [{"class": classes[i], "confidence": float(prediction[0][i])} for i in top_indices]

        # Debug prints
        print("Predictions:", top_preds)

        # Remove temporary image
        os.remove(img_path)

        return jsonify({
    "top_prediction": top_preds[0],
    "all_predictions": top_preds
})
    except Exception as e:
        print("Error in /predict:", e)
        return jsonify({"error": str(e)}), 500

# Run app
if __name__ == "__main__":
    app.run(debug=True)