require("dotenv").config();
const API_KEY = process.env.API_KEY;

// Middleware to validate API Key
const authenticateAPIKey = (req, res, next) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({ 
      message: "Unauthorized: Missing API Key. Request an API key by contacting ebinuga@hotmail.com." 
    });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({ 
      message: "Forbidden: Invalid API Key. Request an API key by contacting ebinuga@hotmail.com." 
    });
  }

  next();
};

module.exports = authenticateAPIKey;
