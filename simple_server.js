const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Add middleware for better mobile support
app.use((req, res, next) => {
  // Set proper headers for responsive content
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  // Add viewport meta tag for mobile responsiveness
  if (req.path.endsWith('.html')) {
    res.header('Content-Type', 'text/html');
  }
  next();
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Serving files from: ${__dirname}`);
  console.log('Press Ctrl+C to stop the server');
});