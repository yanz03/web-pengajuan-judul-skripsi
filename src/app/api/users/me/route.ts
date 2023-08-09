import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
export async function POST(request: NextRequest) {
  try {
    const id = await getDataFromToken(request);
    const data = await User.findOne({ _id: id });

    const id_pembimbing_1 = data.id_pembimbing_1;
    const id_pembimbing_2 = data.id_pembimbing_2;
    // mengambil seluruh data pembimbing 1 dan 2 kecuali password
    let pembimbing_1 = [];
    let pembimbing_2 = [];
    if (id_pembimbing_1.length > 0 && id_pembimbing_2.length > 0) {
      pembimbing_1 = await User.findOne({ _id: id_pembimbing_1 }).select([
        "-password",
        "-id_pembimbing_1",
        "-id_pembimbing_1",
      ]);
      pembimbing_2 = await User.findOne({ _id: id_pembimbing_2 }).select([
        "-password",
        "-id_pembimbing_1",
        "-id_pembimbing_1",
      ]);
    }

    return NextResponse.json({
      message: "User found",
      success: true,
      data: data,
      pembimbing: {
        pembimbing_1,
        pembimbing_2,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
