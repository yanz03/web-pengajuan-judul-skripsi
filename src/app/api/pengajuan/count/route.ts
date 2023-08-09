import { connect } from "@/lib/mongodb/config";
import { NextRequest, NextResponse } from "next/server";
import Pengajuan from "@/models/Pengajuan";
connect();
export async function GET(request: NextRequest) {
  try {
    const pengajuan = await Pengajuan.find();

    const jumlahPengajuanDiterima = pengajuan.filter((item) => {
      return item.status === "Diterima";
    });

    const jumlahPengajuanDitolak = pengajuan.filter((item) => {
      return item.status === "Ditolak";
    });

    return NextResponse.json({
      message: "Berhasil menampilkan semua data pengajuan!",
      success: true,
      data: {
        diterima: jumlahPengajuanDiterima.length,
        ditolak: jumlahPengajuanDitolak.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
