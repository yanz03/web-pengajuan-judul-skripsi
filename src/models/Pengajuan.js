import mongoose from "mongoose";

const PengajuanSchema = new mongoose.Schema({
  // dari db
  id_mahasiswa: {
    type: String,
    required: [true, "id_mahasiswa harus diisi"],
  },
  nama_mahasiswa: {
    type: String,
    required: [true, "Nama harus diisi"],
  },
  nim_mahasiswa: {
    type: String,
    required: [true, "NIM harus diisi"],
  },
  nomor_mahasiswa: {
    type: String,
    required: [true, "Nomor harus diisi"],
  },
  id_gelombang: {
    type: String,
    required: [true, "id_gelombang harus diisi"],
  },
  // inputan
  ipk_mahasiswa: {
    type: String,
    required: [true, "IPK harus diisi"],
  },
  judul: {
    type: String,
    required: [true, "Judul harus diisi"],
  },
  abstrak: {
    type: String,
    required: [true, "Abstrak harus diisi"],
  },
  photo: {
    type: String,
    required: [true, "Photo harus diisi"],
  },
  transkip_nilai: {
    type: String,
    required: [true, "Transkip nilai harus diisi"],
  },
  kst: {
    type: String,
    required: [true, "KST harus diisi"],
  },
  proposal: {
    type: String,
    required: [true, "Proposal harus diisi"],
  },
  laporan_pkl: {
    type: String,
    required: [true, "Laporan pkl harus diisi"],
  },
  surat_bukti_pkl: {
    type: String,
    required: [true, "Surat bukti pkl harus diisi"],
  },
  // default
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Menunggu",
  },
  aktivasi: {
    type: Boolean,
    default: false,
  },
  alasan: {
    type: String,
    default: null,
  },
});

const Pengajuan =
  mongoose.models.pengajuans || mongoose.model("pengajuans", PengajuanSchema);

export default Pengajuan;
