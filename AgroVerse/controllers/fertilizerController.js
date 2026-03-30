exports.showFertilizerPage = (req, res) => {
    res.render("fertilizer/fertilizer", { result: null });
};

exports.getRecommendation = (req, res) => {

    const { crop, soil } = req.body;

    const fertilizerData = {

        rice: {
            fertilizer: "Urea + Potash",
            nutrients: "Nitrogen and Potassium",
            quantity: "50 kg per acre",
            benefit: "Improves leaf growth and grain yield"
        },

        wheat: {
            fertilizer: "DAP + Urea",
            nutrients: "Nitrogen and Phosphorus",
            quantity: "40 kg per acre",
            benefit: "Strengthens roots and improves grain quality"
        },

        maize: {
            fertilizer: "NPK",
            nutrients: "Nitrogen, Phosphorus, Potassium",
            quantity: "35 kg per acre",
            benefit: "Promotes balanced crop growth"
        },

        cotton: {
            fertilizer: "NPK + Urea",
            nutrients: "Nitrogen rich fertilizer",
            quantity: "45 kg per acre",
            benefit: "Improves cotton fiber development"
        },

        sugarcane: {
            fertilizer: "DAP + Potash",
            nutrients: "Phosphorus and Potassium",
            quantity: "60 kg per acre",
            benefit: "Helps strong cane growth and sugar formation"
        },

        soybean: {
            fertilizer: "Single Super Phosphate",
            nutrients: "Phosphorus",
            quantity: "30 kg per acre",
            benefit: "Improves root nodules and nitrogen fixation"
        },

        tomato: {
            fertilizer: "NPK + Organic Compost",
            nutrients: "Balanced NPK nutrients",
            quantity: "25 kg per acre",
            benefit: "Improves fruit size and quality"
        },

        potato: {
            fertilizer: "Potash + Urea",
            nutrients: "Potassium and Nitrogen",
            quantity: "40 kg per acre",
            benefit: "Improves tuber development"
        },

        onion: {
            fertilizer: "NPK",
            nutrients: "Balanced nutrients",
            quantity: "30 kg per acre",
            benefit: "Promotes bulb formation"
        },

        chili: {
            fertilizer: "NPK + Organic Manure",
            nutrients: "Balanced nutrients",
            quantity: "25 kg per acre",
            benefit: "Improves flowering and fruit yield"
        }
    };

    const data = fertilizerData[crop];

    const result = {
        crop,
        soil,
        fertilizer: data.fertilizer,
        nutrients: data.nutrients,
        quantity: data.quantity,
        benefit: data.benefit
    };

    res.render("fertilizer/fertilizer", { result });
};