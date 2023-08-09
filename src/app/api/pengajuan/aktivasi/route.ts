import { connect } from "@/lib/mongodb/config";
import Pengajuan from "@/models/Pengajuan";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { id_pengajuan, id_gelombang, id_mahasiswa } = reqBody;

    if (!id_pengajuan || !id_gelombang || !id_mahasiswa) {
      return NextResponse.json({
        message: "Undifine parameter",
        success: false,
      });
    }

    // update aktivasi di pengajuan berdasarkan paramter diatas
    const pengajuan = await Pengajuan.updateOne(
      {
        _id: id_pengajuan,
        id_gelombang: id_gelombang,
        id_mahasiswa: id_mahasiswa,
      },
      {
        $set: {
          aktivasi: true,
        },
      }
    );

    return NextResponse.json({
      message: "Berhasil mengaktifkan pengajuan",
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
