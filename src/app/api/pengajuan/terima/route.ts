import { connect } from "@/lib/mongodb/config";
import { NextRequest, NextResponse } from "next/server";
import Pengajuan from "@/models/Pengajuan";
import User from "@/models/User";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      id_pengajuan,
      id_gelombang,
      id_mahasiswa,
      id_pembimbing_1,
      id_pembimbing_2,
      alasan,
    } = reqBody;

    const pengajuan = await Pengajuan.findOneAndUpdate(
      {
        _id: id_pengajuan,
        id_gelombang: id_gelombang,
        id_mahasiswa: id_mahasiswa,
      },
      {
        $set: {
          alasan: alasan,
          status: "Diterima",
        },
      }
    );

    const user = await User.findOneAndUpdate(
      {
        _id: id_mahasiswa,
      },
      {
        $set: {
          status: true,
          id_pembimbing_1: id_pembimbing_1,
          id_pembimbing_2: id_pembimbing_2,
        },
      }
    );

    return NextResponse.json({
      message: "Berhasil menerima pengajuan",
      success: true,
      data: {
        user: user,
        pengajuan: pengajuan,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
