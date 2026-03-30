// controllers/irrigationController.js

exports.showIrrigationPage = (req, res) => {
    res.render("irrigation/irrigation", { result: null });
};

exports.getIrrigationRecommendation = (req, res) => {
    const { crop, soil, area } = req.body;

    const irrigationData = {
        rice: { method: "Flood Irrigation", waterRequirement: "5000 L/acre", frequency: "2 times/week", tips: "Avoid overwatering" },
        wheat: { method: "Sprinkler Irrigation", waterRequirement: "4000 L/acre", frequency: "1-2 times/week", tips: "Water in early morning" },
        maize: { method: "Drip Irrigation", waterRequirement: "3500 L/acre", frequency: "2 times/week", tips: "Use mulching for water retention" },
        // add more crops if needed
    };

    const data = irrigationData[crop];

    const result = {
        crop,
        soil,
        area,
        method: data.method,
        waterRequirement: data.waterRequirement,
        frequency: data.frequency,
        tips: data.tips
    };

    res.render("irrigation/irrigation", { result });
};