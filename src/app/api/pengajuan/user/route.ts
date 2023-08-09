import { connect } from "@/lib/mongodb/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Pengajuan from "@/models/Pengajuan";
connect();

// get data pengajuan user yang sedang login
export async function POST(request: NextRequest) {
  try {
    const id = await getDataFromToken(request);

    const pengajuan = await Pengajuan.find({ id_mahasiswa: id }).select([
      "_id",
      "id_gelombang",
      "status",
      "judul",
      "alasan",
      "createdAt",
      "id_mahasiswa",
    ]);

    return NextResponse.json({
      message: "Berhasil menampilkan semua data pengajuan!",
      success: true,
      data: pengajuan,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
