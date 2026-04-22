import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const items = await prisma.menuItem.findMany({
            where: { isAvailable: true },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(items);
    } catch (error) {
        return new NextResponse("DB Error", { status: 500 });
    }
}