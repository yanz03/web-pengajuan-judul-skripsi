import { connect } from "@/lib/mongodb/config";
import { NextRequest, NextResponse } from "next/server";

// Anggap "Pengajuan" merupakan ekspor bernama, gunakan path yang benar untuk impor
import Pengajuan from "@/models/Pengajuan";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id_pengajuan, id_gelombang, id_mahasiswa } = reqBody;
    const pengajuan = await Pengajuan.find({
      _id: id_pengajuan,
      id_gelombang: id_gelombang,
      id_mahasiswa: id_mahasiswa,
    });

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
