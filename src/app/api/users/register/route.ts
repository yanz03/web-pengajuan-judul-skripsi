import { connect } from "@/lib/mongodb/config";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      nama,
      kode,
      angkatan,
      gender,
      nomor,
      email,
      password,
      level,
      confirmPassword,
    } = reqBody;

    if (password !== confirmPassword) {
      return NextResponse.json({
        message: "Password tidak sama",
        success: false,
      });
    }

    // cek if user exist
    const userDb = await User.findOne({ kode });

    if (userDb) {
      return NextResponse.json({
        message: "Akun sudah ada",
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    const user = new User({
      nama,
      kode,
      angkatan,
      gender,
      nomor,
      email,
      password: hash,
      level,
    });

    const response = await user.save();

    return NextResponse.json({
      message: "Akun berhasil dibuat!",
      success: true,
      user: response,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
