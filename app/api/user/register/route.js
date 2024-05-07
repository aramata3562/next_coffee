import { NextResponse } from "next/server";
import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";

export async function POST(request) {
    const reqBody = await request.json()

    try {
        await connectDB()
        await UserModel.create(reqBody)
        return NextResponse.json({message: "User created successfully"})
    } catch (error) {
        return NextResponse.json({message: "User creation failed"})
    }
}