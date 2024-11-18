import client from "@/db"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req: NextRequest) {
    // console.log(body)
    const user =await client.user.findFirst()
    return NextResponse.json({
        username: user?.username,
        FirstName:user?.FirstName,
        LastName:user?.LastName,
        email:user?.email
    })
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        await client.user.create({
            data:{
                username:body.username,
                password:hashedPassword,
                FirstName:body.FirstName,
                LastName:body.LastName,
                email:body.email
            }
        })
        return NextResponse.json({
            body
        });
    }
    catch(e){
        return NextResponse.json({
            message: "Error while signing up",
            },
            {
                status: 500,
            })
    }
    
}