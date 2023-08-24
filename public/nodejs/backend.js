const express = require('express');
const mysql = require('mysql');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

const GOOGLE_CLIENT_ID = 'your-google-client-id';
const GOOGLE_CLIENT_SECRET = 'your-google-client-secret';
const REDIRECT_URL = 'http://localhost:3000/auth/google/callback';

// Use sessions to keep track of user authentication
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Configure Google Strategy for Passport
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: REDIRECT_URL,
}, (accessToken, refreshToken, profile, done) => {
  // Here you can save or manipulate the user data as needed
  return done(null, profile);
}));

// Routes
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Sign in with Google</a>');
});

// Initiate Google authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

// Callback URL after Google authentication
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/profile');
});

// Profile route accessible after successful authentication
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h1>Welcome, ${req.user.displayName}!</h1><a href="/logout">Logout</a>`);
  } else {
    res.redirect('/');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Database connection configuration
const dbConfig = {
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
};

// Create a MySQL pool
const pool = mysql.createPool(dbConfig);

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/webpage.html');
});








// Set up a route to handle the HTML page
app.get('/data', (req, res) => {
    pool.query('SELECT * FROM your_table', (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
