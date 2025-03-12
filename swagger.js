const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contact API",
    description: "API for managing contacts with API key authentication.",
    version: "1.0.0",
  },
  host: "localhost:8080", // Change this if deployed
  schemes: ["http", "https"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "x-api-key",
      description: "API key required for authentication",
    },
  },
  definitions: {
    Contact: {
      id: "12345",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      favoriteColor: "Blue",
      birthday: "1985-09-23",
    },
    ContactInput: {
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      favoriteColor: "Red",
      birthday: "1990-06-15",
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
