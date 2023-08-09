import { connect } from "@/lib/mongodb/config";
import Bimbingan from "@/models/Bimbingan";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;

    // update status bimbingan
    const bimbingan = await Bimbingan.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          status: true,
        },
      }
    );

    return NextResponse.json({
      message: "Berhasil mengaktifkan bimbingan",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
