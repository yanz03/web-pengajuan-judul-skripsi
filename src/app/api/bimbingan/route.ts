import { connect } from "@/lib/mongodb/config";
import Bimbingan from "@/models/Bimbingan";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      id_mahasiswa,
      deskripsi,
      id_pembimbing,
      tanggal_bimbingan,
      nama_mahasiswa,
      nama_pembimbing,
    } = reqBody;

    const bimbingan = new Bimbingan({
      id_mahasiswa,
      nama_mahasiswa,
      id_pembimbing,
      nama_pembimbing,
      tanggal_bimbingan,
      deskripsi,
    });

    const response = await bimbingan.save();
    return NextResponse.json({
      message: "Berhasil menambahkan bimbingan!",
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
