import { connect } from "@/lib/mongodb/config";
import { NextRequest, NextResponse } from "next/server";
import Pesan from "@/models/Pesan";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export async function GET(request: NextRequest) {
  try {
    const user = await getDataFromToken(request);

    const id_mahasiswa = user.id;

    const pesan = await Pesan.find({ penerima: id_mahasiswa });

    return NextResponse.json({
      message: "Berhasil menampilkan semua data pesan!",
      success: true,
      data: pesan,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;

    // delete pesan berdasarkan id
    const pesan = await Pesan.deleteOne({ _id: id });

    return NextResponse.json({
      message: "Berhasil menghapus pesan!",
      success: true,
      data: pesan,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
