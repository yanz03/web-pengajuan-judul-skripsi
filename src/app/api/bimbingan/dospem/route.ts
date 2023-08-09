import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/lib/mongodb/config";
import Bimbingan from "@/models/Bimbingan";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const idUser = await getDataFromToken(request);

    // get data bimbingan
    const bimbingan = await Bimbingan.find({
      id_pembimbing: idUser,
    });

    return NextResponse.json({
      message: "Berhasil menampilkan semua data bimbingan!",
      success: true,
      data: bimbingan,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
