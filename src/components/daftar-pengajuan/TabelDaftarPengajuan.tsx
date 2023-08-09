import { getAllGelombang } from "@/helpers/getAllGelombang";
import {
  Alert,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TabelDaftarPengajuan = ({ user }: any) => {
  const router = useRouter();
  const [gelombang, setGelombang]: any = useState([]);
  const [pengajuan, setPengajuan] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataPenolakan, setDataPenolakan]: any = useState({
    id_pengajuan: "",
    id_gelombang: "",
    id_mahasiswa: "",
    alasan: "",
  });

  const tolakPengajuan = async () => {
    if (dataPenolakan.alasan === "") {
      return;
    }
    onClose();
    setLoading(true);
    const response = await axios.post(`/api/pengajuan/tolak`, dataPenolakan);
    console.log(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllGelombang().then((result) => {
      setGelombang(result);
    });
  }, []);

  const getDaftarPengajuan = async (id: any) => {
    if (id === "") {
      setPengajuan([]);
    } else {
      const data: any = {
        id_gelombang: id,
      };

      const response = await axios.post("/api/pengajuan/list/", data);
      setPengajuan(response.data.data);
    }
  };

  const aktivasiPengajuan = async (
    id_pengajuan: any,
    id_gelombang: any,
    id_mahasiswa: any
  ) => {
    setLoading(true);
    const response = await axios.post(`/api/pengajuan/aktivasi`, {
      id_pengajuan: id_pengajuan,
      id_gelombang: id_gelombang,
      id_mahasiswa: id_mahasiswa,
    });

    if (response.data.success) {
      await getDaftarPengajuan(gelombang[0]._id);
      setLoading(false);
    }
  };
  return (
    <>
      <Stack spacing={5}>
        <Card w={"16rem"}>
          <CardBody>
            <Select onChange={(e) => getDaftarPengajuan(e.target.value)}>
              <option value="">Pilih gelombang</option>
              {gelombang.map((item: any) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.nama}
                  </option>
                );
              })}
            </Select>
          </CardBody>
        </Card>
        {loading ? (
          <Alert status="info">
            <Spinner />
            Loading....
          </Alert>
        ) : null}
        <TableContainer bg={"white"}>
          <Table>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Judul Pengajuan</Th>
                <Th>Mahasiswa</Th>
                <Th>Diajukan Pada</Th>
                <Th>Status</Th>
                <Th>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pengajuan.map((item: any, index: any) => {
                const tanggalDiajukan = new Date(item.createdAt);

                const Opsi = () => {
                  if (user.level === "staf") {
                    if (item.status !== "Diterima") {
                      if (item.aktivasi === false) {
                        return (
                          <Td>
                            <Link
                              href={`/detail-pengajuan/${item._id}/${item.id_gelombang}/${item.id_mahasiswa}`}
                              className="p-2 rounded text-white m-1 bg-sky-600"
                            >
                              Detail
                            </Link>
                            <button
                              className="p-2 rounded bg-green-600 text-white m-1"
                              onClick={() =>
                                aktivasiPengajuan(
                                  item._id,
                                  item.id_gelombang,
                                  item.id_mahasiswa
                                )
                              }
                            >
                              Aktivasi
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onOpen();
                                setDataPenolakan({
                                  id_pengajuan: item._id,
                                  id_gelombang: item.id_gelombang,
                                  id_mahasiswa: item.id_mahasiswa,
                                });
                              }}
                              className="p-2 rounded bg-red-600 text-white m-1"
                            >
                              Tolak
                            </button>
                          </Td>
                        );
                      } else {
                        return (
                          <Td>
                            <Text fontSize={"sm"} fontStyle={"italic"}>
                              Sedang Dalam Peninjauan Kaprodi
                            </Text>
                          </Td>
                        );
                      }
                    } else {
                      return (
                        <Td>
                          <Link
                            href={`/detail-pengajuan/${item._id}/${item.id_gelombang}/${item.id_mahasiswa}`}
                            className="p-2 rounded text-white m-1 bg-sky-600"
                          >
                            Detail
                          </Link>
                        </Td>
                      );
                    }
                  } else {
                    if (item.status !== "Diterima") {
                      if (item.aktivasi) {
                        return (
                          <Td>
                            <Link
                              href={`/detail-pengajuan/${item._id}/${item.id_gelombang}/${item.id_mahasiswa}`}
                              className="p-2 rounded text-white m-1 bg-sky-600"
                            >
                              Detail
                            </Link>

                            <button
                              type="button"
                              onClick={() => {
                                onOpen();
                                setDataPenolakan({
                                  id_pengajuan: item._id,
                                  id_gelombang: item.id_gelombang,
                                  id_mahasiswa: item.id_mahasiswa,
                                });
                              }}
                              className="p-2 rounded bg-red-600 text-white m-1"
                            >
                              Tolak
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setLoading(true);
                                router.push(
                                  `/terima-judul/${item._id}/${item.id_gelombang}/${item.id_mahasiswa}`
                                );
                              }}
                              className="p-2 rounded bg-green-600 text-white m-1"
                            >
                              Terima
                            </button>
                          </Td>
                        );
                      } else {
                        return (
                          <Td>
                            <Text fontStyle={"italic"} fontSize={"sm"}>
                              Sedang dalam pemeriksaan staf!
                            </Text>
                          </Td>
                        );
                      }
                    } else {
                      return (
                        <Td>
                          <Link
                            href={`/detail-pengajuan/${item._id}/${item.id_gelombang}/${item.id_mahasiswa}`}
                            className="p-2 rounded text-white m-1 bg-sky-600"
                          >
                            Detail
                          </Link>
                        </Td>
                      );
                    }
                  }
                };
                return (
                  <Tr key={item._id}>
                    <Td>{index + 1}</Td>
                    <Td>{item.judul}</Td>
                    <Td>{item.nama_mahasiswa}</Td>
                    <Td>{tanggalDiajukan.toLocaleDateString()}</Td>
                    <Td>{item.status}</Td>
                    <Opsi />
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontWeight={"bold"}>
              Anda yakin akan menolak pengajuan ini?
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="8px">Alasan</Text>
            <Textarea
              placeholder="Alasan penolakan"
              size="sm"
              value={dataPenolakan.alasan}
              onChange={(e) =>
                setDataPenolakan({ ...dataPenolakan, alasan: e.target.value })
              }
            />
          </ModalBody>

          <ModalFooter>
            <button
              onClick={onClose}
              className="p-2 m-1 rounded bg-red-600 text-white"
            >
              Cancel
            </button>
            <button
              className="p-2 m-1 rounded bg-blue-600 text-white"
              onClick={tolakPengajuan}
            >
              Submit
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TabelDaftarPengajuan;
