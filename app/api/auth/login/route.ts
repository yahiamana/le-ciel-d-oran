import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { SignJWT } from "jose";
const secretString = process.env.JWT_SECRET;
if (!secretString && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET is not set in production. Please set it in .env");
}
const JWT_SECRET = new TextEncoder().encode(secretString || "super-secret-key-for-development");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });
    }

    console.log(`Login attempt for normalized email: [${email}]`);

    const user = await prisma.adminUser.findUnique({
      where: { email },
    });

    const isValid = user ? await bcrypt.compare(password, user.password) : false;

    if (!isValid || !user) {
      return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
    }

    // Create JWT
    const token = await new SignJWT({ sub: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET);

    // Set HTTP-only Cookie
    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
