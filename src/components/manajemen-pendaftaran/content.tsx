"use client";
import DashboardLayout from "@/components/layouts/Dashboard";
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { getDataUser } from "@/helpers/getDataUser";
import { getAllGelombang } from "@/helpers/getAllGelombang";
import { calculateTimeElapsedInSeconds } from "@/helpers/calculateTimeElapsedInSeconds";
import { BsPencilSquare, BsTrash2Fill } from "react-icons/bs";
import { useRouter } from "next/navigation";
const Content = () => {
  const [user, setUser]: any = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gelombang, setGelombang] = useState([]);
  const router = useRouter();
  const [isDelete, setIsDelete] = useState(false);
  useEffect(() => {
    getDataUser().then((result) => {
      setUser(result);
    });
    getAllGelombang().then((result) => {
      setGelombang(result);
    });
  }, []);

  if (user.length === 0)
    return (
      <Flex justifyContent={"center"} minH={"100vh"} alignItems={"center"}>
        <Spinner />
      </Flex>
    );

  if (user.level !== "kaprodi") {
    router.push("/");
    return (
      <Flex justifyContent={"center"} minH={"100vh"} alignItems={"center"}>
        <Spinner />
      </Flex>
    );
  }

  // delete gelombang
  const deleteGelombang = async (id: any) => {
    setIsDelete(true);
    const response = await axios.post(`/api/gelombang/delete`, {
      id: id,
    });

    if (response.data.success) {
      getAllGelombang().then((result) => {
        setGelombang(result);
      });
    }

    setIsDelete(false);
  };
  const ModalForm = () => {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [data, setData] = useState({
      nama: "",
      tanggal_buka: "",
      tanggal_tutup: "",
    });

    const [prosses, setProsses] = useState(false);
    const [message, setMessage] = useState("");
    const [notif, setNotif]: any = useState("");

    const addGelombang = async () => {
      setProsses(true);
      if (
        data.nama !== "" ||
        data.tanggal_buka !== "" ||
        data.tanggal_tutup !== ""
      ) {
        const response = await axios.post("/api/gelombang", data);
        if (response.data.success) {
          getAllGelombang().then((result) => {
            setGelombang(result);
          });
          setProsses(false);
          setMessage(response.data.message);
          setNotif("success");
          setData({
            nama: "",
            tanggal_buka: "",
            tanggal_tutup: "",
          });
        } else {
          setProsses(false);
          setMessage(response.data.message);
          setNotif("error");
        }
      } else {
        setNotif("error");
        setMessage("Data tidak boleh kosong!");
        setProsses(false);
      }
    };

    return (
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Buat Gelombang Pendaftaran</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Stack spacing={3}>
                {message && (
                  <Alert status={notif}>
                    <AlertIcon />
                    {message}
                  </Alert>
                )}
                <FormControl isRequired>
                  <Input
                    type="text"
                    value={data.nama}
                    onChange={(e) => setData({ ...data, nama: e.target.value })}
                    placeholder="Nama Gelombang"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Tanggal Buka</FormLabel>
                  <Input
                    ref={initialRef}
                    value={data.tanggal_buka}
                    onChange={(e) =>
                      setData({ ...data, tanggal_buka: e.target.value })
                    }
                    type="date"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Tanggal Berakhir</FormLabel>
                  <Input
                    type="date"
                    value={data.tanggal_tutup}
                    onChange={(e) =>
                      setData({ ...data, tanggal_tutup: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <button
                className="p-2 mx-2 rounded bg-blue-500 text-white hover:bg-blue-700"
                onClick={addGelombang}
                disabled={prosses}
              >
                {prosses ? <Spinner /> : "Submit"}
              </button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <DashboardLayout user={user}>
      <Stack spacing={5}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Manajemen Buka Pendaftaran
        </Text>
        <Box>
          <button
            onClick={onOpen}
            className="font-bold p-3 text-white bg-green-600 hover:bg-green-900 rounded"
          >
            Buat Gelombang Baru
          </button>
        </Box>
        {isDelete && (
          <Box bg={"white"} padding={5}>
            <Spinner />
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Prosses Deleted!
            </Text>
          </Box>
        )}
        {gelombang.length > 0 ? (
          <Box>
            <TableContainer bg={"white"}>
              <Table variant={"simple"}>
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Nama</Th>
                    <Th>Jumlah pengajuan</Th>
                    <Th>Status</Th>
                    <Th>Dimulai Pada</Th>
                    <Th>DiBerakhir Pada</Th>
                    <Th>Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {gelombang.map((item: any, index: any) => {
                    // Menghitung waktu dalam detik untuk tanggal buka, tutup, dan sekarang
                    const timeBuka: number = calculateTimeElapsedInSeconds(
                      item.tanggal_buka
                    );
                    const timeTutup: number = calculateTimeElapsedInSeconds(
                      item.tanggal_tutup
                    );

                    // Tentukan logika untuk mengubah status buka dan tutup berdasarkan waktu
                    let status: string = "";
                    let bg: string = "";
                    if (timeBuka <= 0 && timeTutup >= 0) {
                      // Jika waktu buka sudah terlewati (timeBuka <= 0) dan waktu tutup belum terlewati (timeTutup >= 0),
                      // maka statusnya adalah "buka"
                      status = "buka";
                      bg = "bg-green-600";
                    } else if (timeTutup < 0) {
                      // Jika waktu tutup sudah terlewati (timeTutup < 0), maka statusnya adalah "tutup"
                      status = "tutup";
                      bg = "bg-red-600";
                    } else {
                      // Jika belum masuk ke kedua kondisi di atas, maka statusnya adalah "belum buka"
                      status = "belum buka";
                      bg = "bg-yellow-600";
                    }

                    return (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>{item.nama}</Td>
                        <Td>{item.jumlah_pengajuan}</Td>
                        <Td>
                          <span className={`p-2 rounded ${bg} text-white`}>
                            {status}
                          </span>
                        </Td>
                        <Td>{item.tanggal_buka}</Td>
                        <Td>{item.tanggal_tutup}</Td>
                        <Td>
                          {/* <button className="p-2 bg-sky-600 text-white m-1 rounded">
                            <BsPencilSquare />
                          </button> */}
                          <button
                            onClick={() => deleteGelombang(item.id)}
                            className="p-2 bg-red-600 text-white m-1 rounded"
                          >
                            <BsTrash2Fill />
                          </button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Box>
            <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
              Tidak Ada Gelombang Pendaftaran!
            </Text>
          </Box>
        )}
      </Stack>
      <ModalForm />
    </DashboardLayout>
  );
};

export default Content;
