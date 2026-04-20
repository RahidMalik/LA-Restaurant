import { testDatabaseConnection } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const result = await testDatabaseConnection();

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "✅ Database connection successful!",
        itemCount: result.itemCount,
        data: result.data,
      },
      { status: 200 }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        success: false,
        error: "❌ Connection failed",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
