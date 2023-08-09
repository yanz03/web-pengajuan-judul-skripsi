import { connect } from "@/lib/mongodb/config";
import Pengajuan from "@/models/Pengajuan";
import Pesan from "@/models/Pesan";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const { id_pengajuan, id_gelombang, id_mahasiswa, alasan } =
      await request.json();
    const status = "Ditolak";

    const pengajuan = await Pengajuan.updateOne(
      {
        _id: id_pengajuan,
        id_gelombang: id_gelombang,
        id_mahasiswa: id_mahasiswa,
      },
      {
        $set: {
          status: status,
          alasan: alasan,
        },
      }
    );

    // kirim pesan ke user
    const pesan = await Pesan.create({
      pengirim: "admin",
      penerima: id_mahasiswa,
      pesan: alasan,
      jenis_pesan: "Ditolak",
    });

    return NextResponse.json({
      message: "Berhasil menolak pengajuan",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
