const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Show Signup Page
exports.showSignup = (req, res) => {
  res.render('auth/signup'); // make sure views/auth/signup.ejs exists
};

// Handle Signup
exports.signupUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Basic validation
  if (!name || !email || !password || !confirmPassword) {
    return res.send('All fields are required');
  }

  if (password !== confirmPassword) {
    return res.send('Passwords do not match');
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.send('User already exists');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log('✅ User Registered:', email);
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.send('❌ Error registering user');
  }
};

// Show Login Page
exports.showLogin = (req, res) => {
  res.render('auth/login'); // make sure views/auth/login.ejs exists
};

// Handle Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.send('Email and password are required');

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.send('Invalid email or password');

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send('Invalid email or password');

    console.log('✅ User Logged In:', email);
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.send('❌ Error logging in');
  }
};
