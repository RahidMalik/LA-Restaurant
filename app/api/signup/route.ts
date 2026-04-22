import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, password } = body;

        if (!email || !password) {
            return new NextResponse("Missing email or password", { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new NextResponse("User already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: "user",
            },
        });

        return NextResponse.json({
            user: { id: user.id, email: user.email, name: user.name },
            message: "User created successfully"
        });

    } catch (error: any) {
        console.error("SIGNUP_ERROR:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}