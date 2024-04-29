import { getCookie } from "cookies-next";
const jwt = require("jsonwebtoken");

interface DecodedJWT {
  firstname: string;
  lastname: string;
  id: string;
  // Add other properties if there are any
}

function VerifyLogin() {
  let syn_session = getCookie("SYNU");
  if (!syn_session) return null;
  let secret = process.env.NEXT_PUBLIC_PUBLIC_TOKEN_SECRET;
  if (!secret) {
    secret = "";
  }

  try {
    const decoded = jwt.verify(syn_session, secret) as DecodedJWT | null;
    if (decoded && decoded.firstname && decoded.lastname && decoded.id) {
      return decoded;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export default VerifyLogin;
