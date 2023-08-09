import { calculateTimeElapsedInSeconds } from "@/helpers/calculateTimeElapsedInSeconds";
import { getAllGelombang } from "@/helpers/getAllGelombang";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Select,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Td,
  Text,
  Th,
  Tr,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RiwayatPengajuan from "./mahasiswa/RiwayatPengajuan";
import Link from "next/link";
import { getDataUser } from "@/helpers/getDataUser";

const DashboardMahasiswa = ({ user }: any) => {
  const [gelombang, setGelombang]: any = useState([]);
  const [pesan, setPesan]: any = useState([]);
  const [notif, setNotif] = useState(false);
  const [pembimbing1, setPembimbing1]: any = useState([]);
  const [pembimbing2, setPembimbing2]: any = useState([]);
  const getPesan = async () => {
    const response = await axios.get("/api/pesan");
    if (response.data.data.length > 0) {
      setNotif(true);
      setPesan(response.data.data[0]);
    }
  };

  const deletePesan = async (id: String) => {
    setNotif(false);
    const response = await axios.post("/api/pesan", { id: id });
  };

  const getDataPembimbing = async () => {
    const response: any = await axios.post("/api/users/me");
    setPembimbing1(response.data.pembimbing.pembimbing_1);
    setPembimbing2(response.data.pembimbing.pembimbing_2);
  };

  useEffect(() => {
    getPesan();
    getAllGelombang().then((result) => {
      setGelombang(result);
    });

    getDataPembimbing();
  }, []);

  return (
    <>
      {notif ? (
        <Stack
          padding={3}
          bg={"red.100"}
          spacing={3}
          border={"2px"}
          borderColor={"red"}
        >
          <Flex justifyContent={"space-between"}>
            <Stack spacing={3} w={"65%"}>
              <Text color={"red"} fontSize={"4xl"} fontWeight={"bold"}>
                Kamu Belum Berhasil
              </Text>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Judul Kamu Ditolak
              </Text>
              <Text>Judul kamu ditolak dikarenakan alasan berikut!</Text>
              <Stack spacing={3}>
                <Text>Alasan</Text>
                <Text fontWeight={"bold"}>{pesan.pesan}</Text>
                <Text fontSize={"sm"}>
                  Mohon maaf judul kamu ditolak dimohon untuk begabung di
                  gelombang selanjutnya!
                </Text>
              </Stack>
            </Stack>
            <Stack spacing={3} w={"35%"} opacity={"50%"}>
              <Image src="/emot/sedih.png" alt="Emot bahagia" />
            </Stack>
          </Flex>
          <Flex justifyContent={"center"}>
            <Box>
              <button
                className="p-3 rounded bg-blue-600 text-white"
                onClick={() => deletePesan(pesan._id)}
              >
                Gabung Gelombang Selanjutnya!
              </button>
            </Box>
          </Flex>
        </Stack>
      ) : (
        <>
          {user.status === false ? (
            <>
              <Stack>
                <Text>Segera daftarkan judul mu dibawah!</Text>
              </Stack>
              <Tabs>
                <TabList>
                  <Tab>Pengajuan Judul</Tab>
                  <Tab>Riwayat Pengajuan</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    {gelombang.length > 0 ? (
                      <TableContainer bg={"white"}>
                        <Table variant={"simple"}>
                          <Tr>
                            <Th>Aksi</Th>
                            <Th>Nama</Th>
                            <Th>Tanggal buka</Th>
                            <Th>Tanggal tutup</Th>
                          </Tr>
                          {gelombang.map((item: any) => {
                            const timeBuka: number =
                              calculateTimeElapsedInSeconds(item.tanggal_buka);
                            const timeTutup: number =
                              calculateTimeElapsedInSeconds(item.tanggal_tutup);

                            let bg = "";
                            // Tentukan logika untuk mengubah status buka dan tutup berdasarkan waktu
                            if (timeBuka <= 0 && timeTutup >= 0) {
                              item.status = "buka";
                              bg = "text-green-600";
                            } else if (timeTutup < 0) {
                              // Jika waktu tutup sudah terlewati (timeTutup < 0), maka statusnya adalah "tutup"
                              item.status = "sudah tutup";
                              bg = "text-red-600";
                            } else {
                              // Jika belum masuk ke kedua kondisi di atas, maka statusnya adalah "belum buka"
                              item.status = "belum buka";
                              bg = "text-yellow-600";
                            }

                            const Aksi = () => {
                              if (item.author === "Ditolak") {
                                return <p>Anda sudah mengajukan judul.</p>;
                              } else if (item.author === "Diterima") {
                                return <p>Anda sudah mengajukan judul.</p>;
                              } else if (item.author === "Menunggu") {
                                return <p>Anda sudah mengajukan judul.</p>;
                              } else {
                                return (
                                  <Link
                                    href={`/pengajuan-judul/${item._id}`}
                                    className="p-2 rounded bg-blue-600 text-white"
                                  >
                                    Ajukan Judul
                                  </Link>
                                );
                              }
                            };
                            return (
                              <Tr key={item._id}>
                                <Td>
                                  {item.status === "buka" ? (
                                    <Aksi />
                                  ) : (
                                    <p className={`font-bold italic ${bg}`}>
                                      {item.status}
                                    </p>
                                  )}
                                </Td>
                                <Td>{item.nama}</Td>
                                <Td>{item.tanggal_buka}</Td>
                                <Td>{item.tanggal_tutup}</Td>
                              </Tr>
                            );
                          })}
                        </Table>
                      </TableContainer>
                    ) : (
                      <Text>Pendaftaran Belum Dibuka!</Text>
                    )}
                  </TabPanel>
                  <TabPanel>
                    <RiwayatPengajuan />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </>
          ) : (
            <Stack
              padding={3}
              bg={"green.100"}
              spacing={3}
              border={"2px"}
              borderColor={"green"}
            >
              <Flex justifyContent={"space-between"}>
                <Stack spacing={3} w={"65%"}>
                  <Text color={"green"} fontSize={"4xl"} fontWeight={"bold"}>
                    Kamu berhasil
                  </Text>
                  <Text fontSize={"xl"} fontWeight={"bold"}>
                    Judul Kamu diterima
                  </Text>
                  <Text>Selamat Yaa!!</Text>
                  <Stack spacing={3}>
                    <UnorderedList>
                      <ListItem>
                        <Text>Pembimbing</Text>
                        <OrderedList>
                          <ListItem>{pembimbing1.nama}</ListItem>
                          <ListItem>{pembimbing2.nama}</ListItem>
                        </OrderedList>
                      </ListItem>
                    </UnorderedList>
                  </Stack>
                </Stack>
                <Stack spacing={3} w={"35%"} opacity={"50%"}>
                  <Image src="/emot/bahagia.png" alt="Emot bahagia" />
                </Stack>
              </Flex>
              <Flex justifyContent={"center"}>
                <Box>
                  <Link
                    href={"/bimbingan"}
                    className="p-3 rounded bg-blue-600 text-white"
                  >
                    Ayo bimbingan
                  </Link>
                </Box>
              </Flex>
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export default DashboardMahasiswa;
