const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const diseaseData = require("../models/diseaseModel");

exports.detectDisease = async (req, res) => {
  try {
    const cropType = req.body.cropType;
    const uploadedFile = req.file.filename;

    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path)); // FIXED KEY

    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      formData,
      { headers: formData.getHeaders() }
    );

    const result = response.data;

    // Extract from Flask response
    const diseaseName = result.top_prediction.class;
    const confidence = (result.top_prediction.confidence * 100).toFixed(2);

    // Get dataset info
    const info = diseaseData[diseaseName] || {};

    const cause = info.cause || "Information not available";
    const treatment = info.treatment || "No treatment info";
    const prevention = info.prevention || "No prevention info";
    const diseaseImage = info.diseaseImage || "default.jpg";

    //  Severity Logic
    let severity = "Mild";
    let severityDesc = "Low risk";

    if (diseaseName.toLowerCase().includes("healthy")) {
      severity = "None";
      severityDesc = "Plant is healthy";
    } else if (confidence > 80) {
      severity = "Severe";
      severityDesc = "Immediate action required";
    } else if (confidence > 50) {
      severity = "Medium";
      severityDesc = "Moderate infection";
    }

    // Top 3 predictions
    const top3 = result.all_predictions.map(p => {
      const info = diseaseData[p.class] || {};
      return {
        name: p.class,
        confidence: (p.confidence * 100).toFixed(2),
        image: info.diseaseImage || "default.jpg"
      };
    });

    /* Clean temp file
    fs.unlinkSync(req.file.path);*/

    // Render View
    res.render("disease/disease-Result", {
      cropType,
      diseaseName,
      confidence,
      severity,
      severityDesc,
      cause,
      treatment,
      prevention,
      top3,
      diseaseImage,
      uploadedImage: uploadedFile,
      gradcamImage: null
    });

  } catch (error) {
    console.error("Disease Detection Error:", error);

    res.render("disease/disease-Result", {
      cropType: req.body.cropType,
      diseaseName: "Prediction Failed",
      confidence: 0,
      severity: "-",
      severityDesc: "-",
      cause: "Error in model",
      treatment: "Try again with a clear image",
      prevention: "-",
      top3: [],
      diseaseImage: "default.jpg",
      uploadedImage: req.file ? req.file.filename : null,
      gradcamImage: null
    });
  }
};