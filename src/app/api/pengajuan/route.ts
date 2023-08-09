import { connect } from "@/lib/mongodb/config";
import { NextRequest, NextResponse } from "next/server";
import Pengajuan from "@/models/Pengajuan";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Gelombang from "@/models/Gelombang";
import { writeFile } from "fs/promises";
import User from "@/models/User";
connect();

export async function POST(request: NextRequest) {
  try {
    const id = await getDataFromToken(request);

    const user = await User.findOne({ _id: id });

    // const reqBody = await request.json();
    //  id_gelombang, ipk_mahasiswa, judul, abstrak, photo(image), transkip_nilai(pdf), kst(pdf), proposal(pdf) , laporan_pkl(pdf), surat_bukti_pkl(pdf)
    const data = await request.formData();

    const id_gelombang = data.get("id_gelombang");
    const ipk_mahasiswa = data.get("ipk_mahasiswa");
    const judul = data.get("judul");
    const abstrak = data.get("abstrak");
    const id_mahasiswa = id;

    // check apakah user sudah mengajukan pada gelombang yang sama
    const pengajuanDb = await Pengajuan.findOne({
      id_gelombang: id_gelombang,
      id_mahasiswa: id_mahasiswa,
    });

    if (pengajuanDb) {
      return NextResponse.json({
        message: "Anda sudah mengajukan judul pada gelombang ini!",
        success: false,
      });
    }

    // get file
    const photo: File | null = data.get("photo") as unknown as File;
    const transkip_nilai: File | null = data.get(
      "transkip_nilai"
    ) as unknown as File;
    const kst: File | null = data.get("kst") as unknown as File;
    const proposal: File | null = data.get("proposal") as unknown as File;
    const laporan_pkl: File | null = data.get("laporan_pkl") as unknown as File;
    const surat_bukti_pkl: File | null = data.get(
      "surat_bukti_pkl"
    ) as unknown as File;

    // pengecekan file
    if (
      photo === null ||
      transkip_nilai === null ||
      kst === null ||
      proposal === null ||
      laporan_pkl === null ||
      surat_bukti_pkl === null
    ) {
      return NextResponse.json({
        message: "Tidak ada file yang diupload!",
        success: false,
      });
    }

    // pengecekan type file
    const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    const allowedPdfType = "application/pdf";

    // Validasi tipe file untuk photo
    if (photo && !allowedImageTypes.includes(photo.type)) {
      return NextResponse.json({
        message: "File yang diupload bukan berupa file gambar!",
        success: false,
      });
    }

    // Validasi tipe file untuk file-file lainnya
    const validatePdfType = (file: File | null): boolean => {
      return file ? file.type === allowedPdfType : false;
    };

    if (
      !validatePdfType(transkip_nilai) ||
      !validatePdfType(kst) ||
      !validatePdfType(proposal) ||
      !validatePdfType(laporan_pkl) ||
      !validatePdfType(surat_bukti_pkl)
    ) {
      return NextResponse.json({
        message: "File yang diupload bukan berupa file pdf!",
        success: false,
      });
    }

    // move photo to public/uploads and create url
    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const newFileName = "photo" + id_mahasiswa + id_gelombang + photo.name;
    const path = `./public/uploads/${newFileName}`;
    await writeFile(path, buffer);

    const url_photo = `${process.env.DOMAIN}/uploads/${newFileName}`;

    //move transkip_nilai to public/uploads and create url
    const bytes2 = await transkip_nilai.arrayBuffer();
    const buffer2 = Buffer.from(bytes2);
    const newFileName2 =
      "transkip_nilai" + id_mahasiswa + id_gelombang + transkip_nilai.name;
    const path2 = `./public/uploads/${newFileName2}`;
    await writeFile(path2, buffer2);

    const url_transkip_nilai = `${process.env.DOMAIN}/uploads/${newFileName2}`;

    // move kst to public/uploads and create url
    const bytes3 = await kst.arrayBuffer();
    const buffer3 = Buffer.from(bytes3);
    const newFileName3 = "KST" + id_mahasiswa + id_gelombang + kst.name;
    const path3 = `./public/uploads/${newFileName3}`;
    await writeFile(path3, buffer3);

    const url_kst = `${process.env.DOMAIN}/uploads/${newFileName3}`;

    // move proposal to public/uploads and create url
    const bytes4 = await proposal.arrayBuffer();
    const buffer4 = Buffer.from(bytes4);
    const newFileName4 =
      "proposal" + id_mahasiswa + id_gelombang + proposal.name;
    const path4 = `./public/uploads/${newFileName4}`;
    await writeFile(path4, buffer4);

    const url_proposal = `${process.env.DOMAIN}/uploads/${newFileName4}`;

    // move laporan_pkl to public/uploads and create url
    const bytes5 = await laporan_pkl.arrayBuffer();
    const buffer5 = Buffer.from(bytes5);
    const newFileName5 =
      "laporan_pkl" + id_mahasiswa + id_gelombang + laporan_pkl.name;
    const path5 = `./public/uploads/${newFileName5}`;
    await writeFile(path5, buffer5);

    const url_laporan_pkl = `${process.env.DOMAIN}/uploads/${newFileName5}`;

    // move surat_bukti_pkl to public/uploads and create url
    const bytes6 = await surat_bukti_pkl.arrayBuffer();
    const buffer6 = Buffer.from(bytes6);
    const newFileName6 =
      "surat_bukti_pkl" + id_mahasiswa + id_gelombang + surat_bukti_pkl.name;
    const path6 = `./public/uploads/${newFileName6}`;
    await writeFile(path6, buffer6);

    const url_surat_bukti_pkl = `${process.env.DOMAIN}/uploads/${newFileName6}`;

    // create pengajuan

    const nama_mahasiswa = user.nama;
    const nim_mahasiswa = user.kode;
    const nomor_mahasiswa = user.nomor;

    const pengajuan = new Pengajuan({
      id_mahasiswa,
      nama_mahasiswa,
      nim_mahasiswa,
      nomor_mahasiswa,
      id_gelombang,
      ipk_mahasiswa,
      judul,
      abstrak,
      photo: url_photo,
      transkip_nilai: url_transkip_nilai,
      kst: url_kst,
      proposal: url_proposal,
      laporan_pkl: url_laporan_pkl,
      surat_bukti_pkl: url_surat_bukti_pkl,
    });

    const response = await pengajuan.save();

    const dataGelombang = await Gelombang.findOne({
      _id: id_gelombang,
    });

    // update jumlah_pendaftaran pada gelombang
    await Gelombang.updateOne(
      {
        _id: id_gelombang,
      },
      {
        jumlah_pengajuan: dataGelombang.jumlah_pengajuan + 1,
      }
    );

    return NextResponse.json(
      {
        message: "Berhasil Mengajukan Judul!",
        success: true,
        data: response,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
