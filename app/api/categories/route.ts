import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: "desc" },
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.log("CATEGORY ERROR:", error);
        return NextResponse.json(
            { error: "DB Error" },
            { status: 500 }
        );
    }
}