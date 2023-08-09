import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        message: "Logout out successfully",
        success: true,
      },
      { status: 200 }
    );
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    // response.cookies.delete("token");

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
