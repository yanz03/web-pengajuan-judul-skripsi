import { connect } from "@/lib/mongodb/config";
import Gelombang from "@/models/Gelombang";
import { NextRequest, NextResponse } from "next/server";
connect();

// delete gelombang

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;
    const gelombang = await Gelombang.deleteOne({ id });

    return NextResponse.json({
      message: "Berhasil menghapus gelombang pendaftaran!",
      success: true,
      data: gelombang,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
