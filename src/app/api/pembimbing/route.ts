import { connect } from "@/lib/mongodb/config";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function GET(request: NextRequest) {
  try {
    const pembimbing = await User.find({
      level: "dospem",
    });

    return NextResponse.json({
      message: "Berhasil menampilkan semua data pembimbing!",
      success: true,
      data: pembimbing,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
