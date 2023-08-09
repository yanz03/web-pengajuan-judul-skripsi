import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, "Nama harus diisi"],
  },
  kode: {
    type: String,
    required: [true, "kode harus diisi"],
    unique: [true, "kode sudah digunakan"],
  },
  angkatan: {
    type: String,
    required: [true, "Angkatan harus diisi"],
  },
  gender: {
    type: String,
    required: [true, "Gender harus diisi"],
  },
  nomor: {
    type: String,
    required: [true, "Nomor harus diisi"],
  },
  email: {
    type: String,
    required: [true, "Email harus diisi"],
    unique: [true, "Email sudah digunakan"],
  },
  password: {
    type: String,
    required: [true, "Password harus diisi"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  level: {
    type: String,
    required: [true, "Level harus diisi"],
  },
  status: {
    type: Boolean,
    default: false,
  },
  id_pembimbing_1: {
    type: String,
    default: "",
  },
  id_pembimbing_2: {
    type: String,
    default: "",
  },
});

const User = mongoose.models.users || mongoose.model("users", UserSchema);

export default User;
