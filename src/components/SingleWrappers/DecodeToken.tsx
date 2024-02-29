const jwt = require("jsonwebtoken");

// Function to decode JWT token
export const decodeToken = (token: string) => {
  try {
    console.log("Decoding token:", token);
    console.log("Decoding token:", process.env.ACCESS_TOKEN_SECRET);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
