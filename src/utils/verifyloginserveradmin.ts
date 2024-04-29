"use server";

import { cookies } from "next/headers";
import * as jose from "jose";

const jwtConfig = {
  secret: new TextEncoder().encode(
    process.env.NEXT_PUBLIC_ADMIN_PUBLIC_TOKEN_SECRET
  ),
};

async function VerifyLoginServerAdmin() {
  const cookieStore = cookies();
  let syn_session = cookieStore.get("SYNU");
  if (!syn_session) return null;

  try {
    const decoded = await jose.jwtVerify(syn_session.value, jwtConfig.secret);
    if (decoded.payload) {
      return decoded.payload;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default VerifyLoginServerAdmin;
