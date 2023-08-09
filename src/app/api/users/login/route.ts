import { connect } from "@/lib/mongodb/config";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { kode, password } = reqBody;

    // check if user exist
    const user = await User.findOne({ kode });

    if (!user) {
      return NextResponse.json({
        message: "User tidak ditemukan",
        success: false,
      });
    }

    // check if password is correct
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({
        message: "Password salah",
        success: false,
      });
    }

    // generate data token
    const dataToken = {
      id: user._id,
      nama: user.nama,
      kode: user.kode,
      angkatan: user.angkatan,
      gender: user.gender,
      nomor: user.nomor,
      email: user.email,
      level: user.level,
      status: user.status,
      id_pembimbing_1: user.id_pembimbing_1,
      id_pembimbing_2: user.id_pembimbing_2,
    };

    const token = jwt.sign(dataToken, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
