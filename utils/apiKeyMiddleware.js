require("dotenv").config();
const API_KEY = process.env.API_KEY;

// Middleware to validate API Key
const authenticateAPIKey = (req, res, next) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({ 
      message: "Unauthorized: documentationUrl - https://code-lova.github.io/cse341-contactApi-postman-doc" 
    });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({ 
      message: "Forbidden: See documentation - https://code-lova.github.io/cse341-contactApi-postman-doc" 
    });
  }

  next();
};

module.exports = authenticateAPIKey;
