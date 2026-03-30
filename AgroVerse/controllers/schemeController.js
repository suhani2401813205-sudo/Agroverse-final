exports.showSchemesPage = (req, res) => {
    const categories = ["Financial", "Insurance", "Training", "Compensation"];
    const schemes = [
        {
            id: 1,
            name: "PM-KISAN",
            shortDesc: "Financial support for small & marginal farmers.",
            fullDesc: "PM-KISAN provides direct income support of ₹6,000 per year in 3 installments.",
            state: "All",
            eligibility: "Small farmers",
            icon: "bi bi-cash-stack",
            image: "pmkisan.jpg",
            category: "Financial"
        },
        {
            id: 2,
            name: "PMFBY",
            shortDesc: "Crop insurance for farmers.",
            fullDesc: "PMFBY protects farmers against crop losses due to natural calamities.",
            state: "All",
            eligibility: "All farmers",
            icon: "bi bi-shield-fill",
            image: "pmfby.jpg",
            category: "Insurance"
        },
        {
            id: 3,
            name: "Kisan Training Program",
            shortDesc: "Training on modern farming techniques.",
            fullDesc: "Farmers receive practical training for improved yield and efficiency.",
            state: "Punjab",
            eligibility: "All farmers",
            icon: "bi bi-book",
            image: "training.jpg",
            category: "Training"
        },
        {
            id: 4,
            name: "Nuksan Bharpai Scheme",
            shortDesc: "Compensation for crop loss due to natural disasters.",
            fullDesc: "Farmers affected by floods, droughts, or pest attacks receive financial compensation.",
            state: "Maharashtra",
            eligibility: "All affected farmers",
            icon: "bi bi-exclamation-triangle-fill",
            image: "compensation.jpg",
            category: "Compensation"
        }
    ];

    res.render('scheme/schemes', { categories, schemes }); // ✅ Pass variables to EJS
};