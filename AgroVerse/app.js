const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Body parser
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/dashboard', dashboardRoutes);

// Routes
const cropRoutes = require("./routes/cropRoutes");
app.use("/crop", cropRoutes);


const diseaseRoutes = require("./routes/diseaseRoutes");
app.use("/", diseaseRoutes);

const fertilizerRoutes = require("./routes/fertilizerRoutes");
app.use("/fertilizer", fertilizerRoutes);

const irrigationRoutes = require("./routes/irrigationRoutes");
app.use("/irrigation", irrigationRoutes);


const marketRoutes = require("./routes/marketRoutes")

app.use("/market",marketRoutes);

const schemeRoutes = require("./routes/schemeRoutes")

app.use("/scheme",schemeRoutes);

// Home page
app.get('/', (req, res) => {
    res.render('home/home');
});


app.use((req, res, next) => {
    res.locals.showFooter = true; // default
    next();
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
