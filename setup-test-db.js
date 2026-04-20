#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Create the test-db directory structure
const testDbDir = path.join(__dirname, 'app/api/test-db');
if (!fs.existsSync(testDbDir)) {
  fs.mkdirSync(testDbDir, { recursive: true });
  console.log('✅ Created app/api/test-db directory');
}

// Create the route.ts file
const routeContent = `import { testDatabaseConnection } from "@/lib/api";
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
`;

const routePath = path.join(testDbDir, 'route.ts');
fs.writeFileSync(routePath, routeContent);
console.log('✅ Created app/api/test-db/route.ts file');
console.log('\n🎉 Setup complete! Start dev server with: npm run dev');
console.log('   Then test the endpoint at: http://localhost:3000/api/test-db');
