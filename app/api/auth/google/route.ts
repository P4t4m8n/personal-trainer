import { NextResponse } from "next/server";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

export async function GET() {
  console.log("REDIRECT_URI:", REDIRECT_URI)
  console.log("CLIENT_ID:", CLIENT_ID)
  const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;

  return NextResponse.redirect(googleAuthURL);
}
