import { connect } from "@/lib/mongodb/config";
import { NextResponse } from "next/server";
import User from "@/models/User";
connect();
export async function GET() {
  try {
    const user = await User.find();

    const mahasiswa = user.filter((user) => user.level === "mahasiswa");
    const dospem = user.filter((user) => user.level === "dospem");

    return NextResponse.json({
      message: "Berhasil menampilkan semua data user!",
      success: true,
      data: {
        mahasiswa: mahasiswa.length,
        dospem: dospem.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
