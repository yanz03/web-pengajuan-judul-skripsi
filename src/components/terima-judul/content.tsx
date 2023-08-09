"use client";
import DashboardLayout from "@/components/layouts/Dashboard";
import { getDataUser } from "@/helpers/getDataUser";
import {
  Box,
  Flex,
  FormControl,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ContentPageTerimaJudul = ({
  id_pengajuan,
  id_gelombang,
  id_mahasiswa,
}: any) => {
  const router = useRouter();
  const [user, setUser]: any = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [pembimbing, setPembimbing] = useState([]);
  useEffect(() => {
    getDataUser().then((result) => {
      setUser(result);
    });
    const getPembimbing = async () => {
      const response = await axios.get("/api/pembimbing");
      setPembimbing(response.data.data);
    };

    getPembimbing();
  }, []);

  const [pembimbing1, setPembimbing1] = useState("");
  const [pembimbing2, setPembimbing2] = useState("");

  const submitForm = async () => {
    setLoading(true);
    const response = await axios.post("/api/pengajuan/terima", {
      id_pengajuan: id_pengajuan,
      id_gelombang: id_gelombang,
      id_mahasiswa: id_mahasiswa,
      alasan: keterangan,
      id_pembimbing_1: pembimbing1,
      id_pembimbing_2: pembimbing2,
    });

    if (response.data.success) {
      setLoading(false);
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage("");
        router.push("/daftar-pengajuan");
      }, 2000);
    } else {
      setLoading(false);
      setMessage(response.data.message);
    }
  };

  if (user.length === 0) {
    return (
      <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Spinner />
      </Flex>
    );
  }

  if (
    user.level === "mahasiswa" ||
    user.level === "dospem" ||
    user.level === "staf"
  ) {
    router.push("/");
    return (
      <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Spinner />
      </Flex>
    );
  }

  if (loading) {
    return (
      <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Spinner />
      </Flex>
    );
  }
  return (
    <DashboardLayout user={user}>
      <Box padding={5} bg={"white"}>
        <Stack spacing={3}>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            Anda Yakin untuk menerima judul?
          </Text>
          {message && <Text>{message}</Text>}
          <FormControl>
            <Select
              id="pembimbing1"
              placeholder="Pilih pembimbing 1"
              value={pembimbing1}
              onChange={(e) => setPembimbing1(e.target.value)}
            >
              {pembimbing.map((pembimbing: any) => (
                <option value={pembimbing._id} key={pembimbing._id}>
                  {pembimbing.nama}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Select
              id="pembimbing2"
              placeholder="Pilih pembimbing 2"
              value={pembimbing2}
              onChange={(e) => setPembimbing2(e.target.value)}
            >
              {pembimbing.map((pembimbing: any) => (
                <option value={pembimbing._id} key={pembimbing._id}>
                  {pembimbing.nama}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Textarea
              placeholder="Keterangan (opsional)"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
            />
          </FormControl>
          <Box>
            <button
              type="button"
              onClick={submitForm}
              className="p-3 rounded bg-blue-600 text-white m-1"
            >
              Submit
            </button>
            <Link
              href={"/daftar-pengajuan"}
              className="p-3 rounded bg-red-600 text-white m-1"
            >
              Cancel
            </Link>
          </Box>
        </Stack>
      </Box>
    </DashboardLayout>
  );
};

export default ContentPageTerimaJudul;
