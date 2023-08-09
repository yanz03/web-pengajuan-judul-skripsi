import mongoose from "mongoose";

const GelombangSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, "Nama harus diisi"],
  },
  tanggal_buka: {
    type: String,
    required: [true, "Tanggal harus diisi"],
  },
  tanggal_tutup: {
    type: String,
    required: [true, "Tanggal harus diisi"],
  },
  author: {
    type: String,
    required: [true, "Author harus diisi"],
  },
  id_author: {
    type: String,
    required: [true, "id_author harus diisi"],
  },
  jumlah_pengajuan: {
    type: Number,
    default: 0,
  },
});

const Gelombang =
  mongoose.models.gelombangs || mongoose.model("gelombangs", GelombangSchema);

export default Gelombang;
