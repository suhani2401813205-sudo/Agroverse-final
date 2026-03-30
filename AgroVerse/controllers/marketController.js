// controllers/marketController.js
const axios = require("axios"); // if using API fetch

// Show the market page initially
exports.showMarketPage = (req, res) => {
    res.render("market/market", { result: null });
};

// Get market price data
exports.getMarketPrice = async (req, res) => {
    const { crop, state } = req.body;

    // --- API approach ---
    // Replace with your API KEY
    const API_KEY = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";
    const API_URL = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[state.keyword]=${state}&filters[commodity]=${crop}&limit=50`;

    try {
        const response = await axios.get(API_URL);
        let records = response.data.records;

        if (!records || records.length === 0) {
            return res.render("market/market", { result: [], crop, state, bestMarket: null });
        }

        // Convert API data to your needed format
        const result = records.map(item => ({
            market: item.market,
            min_price: parseInt(item.min_price),
            max_price: parseInt(item.max_price),
            modal_price: parseInt(item.modal_price)
        }));

        // Find best market (highest modal price)
        const bestMarket = result.reduce((prev, curr) => {
            return curr.modal_price > prev.modal_price ? curr : prev;
        }, result[0]);

        res.render("market/market", { result, crop, state, bestMarket });

    } catch (error) {
        console.error(error);
        res.render("market/market", { result: [], crop, state, bestMarket: null });
    }

    // --- Optional: Static data approach ---
    /*
    const marketData = {
        Rice: [
            { market: "Pune", min_price: 1800, max_price: 2200, modal_price: 2000 },
            { market: "Nagpur", min_price: 1750, max_price: 2100, modal_price: 1900 },
            { market: "Mumbai", min_price: 1850, max_price: 2250, modal_price: 2100 }
        ],
        Wheat: [
            { market: "Amritsar", min_price: 2000, max_price: 2400, modal_price: 2200 },
            { market: "Ludhiana", min_price: 1950, max_price: 2350, modal_price: 2100 }
        ]
    };

    const result = marketData[crop] || [];
    if(result.length === 0) return res.render("market/market", { result: [], crop, state, bestMarket: null });

    const bestMarket = result.reduce((prev,curr) => curr.modal_price > prev.modal_price ? curr : prev, result[0]);

    res.render("market/market", { result, crop, state, bestMarket });
    */
};