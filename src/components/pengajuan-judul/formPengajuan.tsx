"use client";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FormPengajuan = ({ id }: any) => {
  const [loading, setLoading] = useState(false);
  const [notif, setNotif]: any = useState("");
  const [message, setMessage]: any = useState("");
  const router = useRouter();

  const [dataPengajuan, setDataPengajuan]: any = useState({
    id_gelombang: id,
    ipk_mahasiswa: "",
    judul: "",
    abstrak: "",
  });

  const [photo, setPhoto]: any = useState<File>();
  const [transkip_nilai, setTranskip_nilai]: any = useState<File>();
  const [kst, setKst]: any = useState<File>();
  const [proposal, setProposal]: any = useState<File>();
  const [laporan_pkl, setLaporan_pkl]: any = useState<File>();
  const [surat_bukti_pkl, setSurat_bukti_pkl]: any = useState<File>();

  const [stap, setStap] = useState(1);
  const addPengajuan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let data = new FormData();
    data.set("photo", photo);
    data.set("transkip_nilai", transkip_nilai);
    data.set("kst", kst);
    data.set("proposal", proposal);
    data.set("laporan_pkl", laporan_pkl);
    data.set("surat_bukti_pkl", surat_bukti_pkl);
    data.set("ipk_mahasiswa", dataPengajuan.ipk_mahasiswa);
    data.set("judul", dataPengajuan.judul);
    data.set("abstrak", dataPengajuan.abstrak);
    data.set("id_gelombang", dataPengajuan.id_gelombang);
    data.set("id_user", dataPengajuan.id_user);

    const response = await fetch("/api/pengajuan", {
      method: "POST",
      body: data,
    });

    const dataJson = await response.json();
    if (dataJson.success) {
      setNotif("success");
      setMessage(dataJson.message);
    } else {
      setNotif("error");
      setMessage(dataJson.message);
    }
    setPhoto("");
    setTranskip_nilai("");
    setKst("");
    setProposal("");
    setLaporan_pkl("");
    setSurat_bukti_pkl("");
    setDataPengajuan({
      id_gelombang: id,
      ipk_mahasiswa: "",
      judul: "",
      abstrak: "",
    });
    setLoading(false);

    setTimeout(() => {
      setMessage("");
      router.push("/");
    }, 3000);
  };
  return (
    <form onSubmit={addPengajuan}>
      <Box padding={5} bg={"white"}>
        <Stack spacing={5}>
          {/* stap 1 */}
          {stap === 1 ? (
            <Stack spacing={3}>
              <FormControl isRequired>
                <FormLabel>Judul Skripsi</FormLabel>
                <Input
                  type="text"
                  placeholder="Judul Skripsi"
                  value={dataPengajuan.judul}
                  onChange={(e) =>
                    setDataPengajuan({
                      ...dataPengajuan,
                      judul: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Abstrak</FormLabel>
                <Input
                  type="text"
                  placeholder="Abstrak"
                  value={dataPengajuan.abstrak}
                  onChange={(e) =>
                    setDataPengajuan({
                      ...dataPengajuan,
                      abstrak: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>IPK Terbaru</FormLabel>
                <Input
                  type="text"
                  placeholder="Ipk Terbaru"
                  value={dataPengajuan.ipk_mahasiswa}
                  onChange={(e) =>
                    setDataPengajuan({
                      ...dataPengajuan,
                      ipk_mahasiswa: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl>
                <button
                  className="p-3 rounded bg-blue-600 text-white"
                  onClick={() => setStap(2)}
                >
                  Next
                </button>
              </FormControl>
            </Stack>
          ) : (
            <Stack spacing={3}>
              {message && (
                <Alert status={notif} variant="subtle">
                  <AlertIcon />
                  {message}
                </Alert>
              )}
              <FormControl isRequired>
                <FormLabel>Pas Foto 4 x 6</FormLabel>
                <Text fontStyle={"italic"}>
                  Background Foto, (Perempuan warna merah dan laki laki warna
                  biru) Nama file (NIM_photo)
                </Text>
                <Input
                  type="file"
                  onChange={(e) => setPhoto(e.target.files?.[0])}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Transkip Nilai</FormLabel>
                <Text fontStyle={"italic"}>
                  Transkip nilai dicetak dari portal dalam format pdf Nama File
                  (NIM_tsanskip)
                </Text>
                <Input
                  type="file"
                  onChange={(e) => setTranskip_nilai(e.target.files?.[0])}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Kartu Staf</FormLabel>
                <Text fontStyle={"italic"}>
                  Kartu Studi Tetap dicetak dari portal dalam format pdf Nama
                  File (NIM_kartustaf)
                </Text>
                <Input
                  type="file"
                  onChange={(e) => setKst(e.target.files?.[0])}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Proposal</FormLabel>
                <Text fontStyle={"italic"}>
                  Lampiran file proposal penelitian dalam format pdf Nama File
                  (NIM_proposal)
                </Text>
                <Input
                  type="file"
                  onChange={(e) => setProposal(e.target.files?.[0])}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Laporan Pkl</FormLabel>
                <Text fontStyle={"italic"}>
                  Lampiran file laporan penelitian dalam format pdf Nama File
                  (NIM_laporan_pkl)
                </Text>
                <Input
                  type="file"
                  onChange={(e) => setLaporan_pkl(e.target.files?.[0])}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Surat Bukti Pkl</FormLabel>
                <Text fontStyle={"italic"}>
                  Lampiran file surat bukti penelitian dalam format pdf Nama
                  File (NIM_surat_bukti_pkl)
                </Text>
                <Input
                  type="file"
                  onChange={(e) => setSurat_bukti_pkl(e.target.files?.[0])}
                />
              </FormControl>
              <FormControl>
                <button
                  className="p-3 rounded bg-slate-500 mx-1"
                  onClick={() => setStap(1)}
                >
                  Back
                </button>
                <button
                  className="p-3 rounded bg-blue-600 mx-1 text-white hover:bg-blue-700"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Text>
                      <Spinner size={"sm"} /> Prosses upload dimohon untuk tidak
                      menutup layar!
                    </Text>
                  ) : (
                    "Submit"
                  )}
                </button>
              </FormControl>
            </Stack>
          )}
        </Stack>
      </Box>
    </form>
  );
};

export default FormPengajuan;
