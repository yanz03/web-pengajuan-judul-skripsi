import mongoose from "mongoose";

const PesanSchema = new mongoose.Schema({
  pengirim: {
    type: String,
    required: [true, "id_user harus diisi"],
  },
  penerima: {
    type: String,
    required: [true, "id_user harus diisi"],
  },
  pesan: {
    type: String,
    required: [true, "pesan harus diisi"],
  },
  jenis_pesan: {
    type: String,
    required: [true, "jenis_pesan harus diisi"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pesan = mongoose.models.pesans || mongoose.model("pesans", PesanSchema);

export default Pesan;
