// Show Crop Selection Page
exports.showCropSelection = (req, res) => {
    res.locals.showFooter = false;  // 👈 THIS LINE IS KEY
    res.render("crop/crop-selection");
};
// Handle Recommendation
exports.getRecommendation = async (req, res) => {

    const {
        season,
        soilType,
        waterLevel,
        temperature,
        locationType,
        landSize
    } = req.body;

    // CORRECT PLACE FOR VALIDATION
    if (
        !season ||
        !soilType ||
        !waterLevel ||
        !temperature ||
        !locationType ||
        !landSize
    ) {
        return res.redirect("/crop"); // better UX
    }

    let crops = [];
    let confidence = [];
    let recommendedCrop = "Wheat";

    // 🌾 STEP 1: BASED ON SEASON
    if (season === "Kharif") {
        crops = ["Rice", "Maize", "Cotton"];
    } 
    else if (season === "Rabi") {
        crops = ["Wheat", "Barley", "Mustard"];
    } 
    else {
        crops = ["Watermelon", "Cucumber", "Vegetables"];
    }

    //  STEP 2: MODIFY BASED ON WATER
    if (waterLevel === "Low") {
        crops[0] = "Millets";
    }

    //  STEP 3: SOIL EFFECT
    if (soilType === "Black") {
        crops[1] = "Cotton";
    } else if (soilType === "Alluvial") {
        crops[1] = "Rice";
    }

    //  STEP 4: TEMPERATURE EFFECT
    if (temperature === "Above 30") {
        crops[2] = "Sugarcane";
    }

    //  STEP 5: LOCATION EFFECT
    if (locationType === "Dry") {
        crops[0] = "Millets";
    }

    //  FINAL BEST CROP
    recommendedCrop = crops[0];

    //  CONFIDENCE
    confidence = crops.map((_, index) => {
        return Math.floor(Math.random() * 15) + (85 - index * 10);
    });

    // WEATHER API
    let weatherTemp = "N/A";
    let humidity = "N/A";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=d44083eca0ee279579cfb2ad99a2ebc5&units=metric`
        );

        const data = await response.json();
        console.log("Weather Data:", data);

        if (data.cod === 200) {
            weatherTemp = data.main.temp;
            humidity = data.main.humidity;
        }

    } catch (error) {
        console.log("Weather API Error:", error);
    }
    res.locals.showFooter = false;  
    // FINAL RESPONSE
    res.render("crop/crop-result", {
        
        season,
        soilType,
        waterLevel,
        temperature,
        locationType,
        landSize,
        recommendedCrop,
        crops,
        confidence,
        weatherTemp,
        humidity,
        
    });
};