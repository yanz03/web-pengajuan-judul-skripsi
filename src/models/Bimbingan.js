import mongoose from "mongoose";

const BimbinganSchema = new mongoose.Schema({
  id_mahasiswa: {
    type: String,
    required: [true, "id_mahasiswa harus diisi"],
  },
  nama_mahasiswa: {
    type: String,
    required: [true, "Nama harus diisi"],
  },
  id_pembimbing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  nama_pembimbing: {
    type: String,
    required: [true, "Nama harus diisi"],
  },
  tanggal_bimbingan: {
    type: String,
    required: [true, "tanggal_bimbingan harus diisi"],
  },
  deskripsi: {
    type: String,
    required: [true, "deskripsi harus diisi"],
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Bimbingan =
  mongoose.models.bimbingans || mongoose.model("bimbingans", BimbinganSchema);

export default Bimbingan;
