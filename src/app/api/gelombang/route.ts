import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/lib/mongodb/config";
import Gelombang from "@/models/Gelombang";
import Pengajuan from "@/models/Pengajuan";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { nama, tanggal_buka, tanggal_tutup } = reqBody;

    const author = "*****";
    const id_author = await getDataFromToken(request);
    const gelombang = new Gelombang({
      nama,
      tanggal_buka,
      tanggal_tutup,
      author,
      id_author,
    });

    const response = await gelombang.save();

    return NextResponse.json({
      message: "Berhasil menambahkan gelombang pendaftaran baru!",
      success: true,
      data: response,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const gelombang = await Gelombang.find();
    const id = await getDataFromToken(request);
    const user = await User.findOne({ _id: id });
    if (user.level === "mahasiswa") {
      for (let i = 0; i < gelombang.length; i++) {
        const pengajuan: any = await Pengajuan.findOne({
          id_gelombang: gelombang[i].id,
          id_mahasiswa: user.id,
        });

        if (pengajuan !== null) {
          gelombang[i].author = pengajuan.status;
        }
      }
    }

    return NextResponse.json({
      message: "Berhasil menampilkan semua gelombang pendaftaran!",
      success: true,
      data: gelombang,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
