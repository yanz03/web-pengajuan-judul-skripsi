"use client";
import DashboardLayout from "@/components/layouts/Dashboard";
import { getDataUser } from "@/helpers/getDataUser";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  ListItem,
  Spinner,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ContentPageDetailPengajuan = ({
  id_pengajuan,
  id_gelombang,
  id_mahasiswa,
}: any) => {
  const [data, setData]: any = useState([]);
  const [user, setUser] = useState([]);

  const getDetailPengajuan = async () => {
    const response = await axios.post("/api/pengajuan/detail", {
      id_pengajuan: id_pengajuan,
      id_gelombang: id_gelombang,
      id_mahasiswa: id_mahasiswa,
    });
    setData(response.data.data[0]);
  };

  useEffect(() => {
    getDataUser().then((result) => {
      setUser(result);
    });
    getDetailPengajuan();
  }, []);

  if (data.length === 0) {
    return (
      <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <DashboardLayout user={user}>
      <Stack spacing={3}>
        <Card bg={"white"}>
          <CardHeader>
            <Text fontWeight={"bold"} fontSize={"2xl"} color={"orange"}>
              Detail Pengajuan
            </Text>
          </CardHeader>
          <CardBody>
            <UnorderedList>
              <ListItem>
                <Text>Photo Mahasiswa</Text>
                <Image
                  src={data.photo}
                  className="mb-2"
                  width={100}
                  height={100}
                  alt="photo"
                />
                <a
                  download={data.photo}
                  href={data.photo}
                  className="p-2 rounded bg-green-600 text-white"
                >
                  Unduh
                </a>
              </ListItem>
              <ListItem>Nama Mahasiswa : {data.nama_mahasiswa}</ListItem>
              <ListItem>Nim Mahasiswa : {data.nim_mahasiswa}</ListItem>
              <ListItem>Nomor Telp Mahasiswa : {data.nomor_mahasiswa}</ListItem>
              <ListItem>Ipk Mahasiswa : {data.ipk_mahasiswa}</ListItem>
              <ListItem>Id gelombang : {data.id_gelombang}</ListItem>
              <ListItem>Judul Skripsi : {data.judul}</ListItem>
              <ListItem>Abstrak : {data.abstrak}</ListItem>
              <ListItem>Status : {data.status}</ListItem>
              <ListItem>
                <a
                  download={data.transkip_nilai}
                  href={data.transkip_nilai}
                  className="p-2 rounded bg-green-600 text-white m-1"
                >
                  Transkip Nilai
                </a>
                <a
                  download={data.kst}
                  href={data.kst}
                  className="p-2 rounded bg-green-600 text-white m-1"
                >
                  Kartu Studi Tetap
                </a>
                <a
                  download={data.proposal}
                  href={data.proposal}
                  className="p-2 rounded bg-green-600 text-white m-1"
                >
                  Proposal
                </a>
                <a
                  download={data.laporan_pkl}
                  href={data.laporan_pkl}
                  className="p-2 rounded bg-green-600 text-white m-1"
                >
                  laporan pkl
                </a>
                <a
                  download={data.surat_bukti_pkl}
                  href={data.surat_bukti_pkl}
                  className="p-2 rounded bg-green-600 text-white m-1"
                >
                  Surat bukti pkl
                </a>
              </ListItem>
            </UnorderedList>
          </CardBody>
        </Card>
      </Stack>
    </DashboardLayout>
  );
};

export default ContentPageDetailPengajuan;
