const jwt = require("jsonwebtoken");

// Function to decode JWT token
export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
