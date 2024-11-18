import client from "@/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY; 

if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the environment variables");
}

export function GET(req: NextRequest) {
    return NextResponse.json({
        message: "Welcome back",
    });
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const user = await client.user.findUnique({
            where: { username: body.username },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid username or password" },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid username or password" },
                { status: 401 }
            );
        }

        const token = jwt.sign({ username: user.username }, SECRET_KEY, {
            expiresIn: "24h",
        });

        const response = NextResponse.json({ message: "Login successful" });
        response.cookies.set("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600,
        });

        return response;
    } catch (e) {
        return NextResponse.json(
            { message: "Error during login" },
            { status: 500 }
        );
    }
}
