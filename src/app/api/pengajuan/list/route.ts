import { connect } from "@/lib/mongodb/config";
import { NextRequest, NextResponse } from "next/server";

// Anggap "Pengajuan" merupakan ekspor bernama, gunakan path yang benar untuk impor
import Pengajuan from "@/models/Pengajuan";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id_gelombang } = reqBody;

    // Anggap "Pengajuan" merupakan ekspor bernama, gunakan langsung tanpa "findOne"
    const pengajuan = await Pengajuan.find({
      id_gelombang: id_gelombang,
    }).select([
      "_id",
      "id_gelombang",
      "id_mahasiswa",
      "nama_mahasiswa",
      "judul",
      "status",
      "aktivasi",
      "createdAt",
    ]);

    // Tunggu hingga Promise dari NextResponse.json() selesai sebelum mengembalikan respons
    return await NextResponse.json({
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
