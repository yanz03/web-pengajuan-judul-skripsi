import {
  Alert,
  Box,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewMhs = ({
  id_mahasiswa,
  pembimbing,
  nama_mahasiswa,
}: {
  id_mahasiswa: string;
  pembimbing: any;
  nama_mahasiswa: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [myBimbingan, setMyBimbingan] = useState([]);
  const [msg, setMsg] = useState("");
  const [dataInput, setDataInput] = useState({
    tanggal_bimbingan: "",
    id_pembimbing: "",
    nama_pembing: "",
    deskripsi: "",
  });

  const getMyBimbingan = async () => {
    const response = await axios.get("/api/bimbingan/user");
    setMyBimbingan(response.data.data);
  };

  useEffect(() => {
    getMyBimbingan();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dataInput.id_pembimbing === pembimbing.pembimbing_1._id) {
      setDataInput({
        ...dataInput,
        nama_pembing: pembimbing.pembimbing_1.nama,
      });
    } else {
      setDataInput({
        ...dataInput,
        nama_pembing: pembimbing.pembimbing_2.nama,
      });
    }
    const response = await axios.post("/api/bimbingan", {
      id_mahasiswa: id_mahasiswa,
      id_pembimbing: dataInput.id_pembimbing,
      tanggal_bimbingan: dataInput.tanggal_bimbingan,
      deskripsi: dataInput.deskripsi,
      nama_pembimbing: dataInput.nama_pembing,
      nama_mahasiswa: nama_mahasiswa,
    });
    if (response.data.success) {
      setDataInput({
        tanggal_bimbingan: "",
        id_pembimbing: "",
        nama_pembing: "",
        deskripsi: "",
      });
      setMsg(response.data.message);
      getMyBimbingan();
    } else {
      setMsg(response.data.message);
    }
  };

  return (
    <>
      <Stack spacing={5}>
        <Text fontSize={"2xl"} fontWeight={"bold"} color={"orange"}>
          Bimbingan
        </Text>
        <Box>
          <button
            onClick={onOpen}
            className="p-3 rounded bg-green-600 text-white"
          >
            Bimbingan
          </button>
        </Box>
        <TableContainer bg={"white"}>
          <Table variant={"simple"}>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Pembimbing</Th>
                <Th>Tanggal Bimbingan</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {myBimbingan.map((item: any, index: number) => {
                let status = "";
                if (item.status) {
                  status = "Valid";
                } else {
                  status = "menuggu validasi dospem!";
                }
                return (
                  <Tr key={index}>
                    <Th>{index + 1}</Th>
                    <Th>{item.nama_pembimbing}</Th>
                    <Th>{item.tanggal_bimbingan}</Th>
                    <Th>{status}</Th>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bimbingan</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              {msg && <Alert>{msg}</Alert>}
              <FormControl isRequired>
                <FormLabel>Tanggal Bimbingan</FormLabel>
                <Input
                  type="date"
                  value={dataInput.tanggal_bimbingan}
                  onChange={(e) =>
                    setDataInput({
                      ...dataInput,
                      tanggal_bimbingan: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Pembimbing</FormLabel>
                <Select
                  placeholder="Pilih Pembimbing"
                  value={dataInput.id_pembimbing}
                  onChange={(e) =>
                    setDataInput({
                      ...dataInput,
                      id_pembimbing: e.target.value,
                    })
                  }
                >
                  <option value={pembimbing.pembimbing_1._id}>
                    {pembimbing.pembimbing_1.nama}
                  </option>
                  <option value={pembimbing.pembimbing_2._id}>
                    {pembimbing.pembimbing_2.nama}
                  </option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Deskripsi</FormLabel>
                <Textarea
                  placeholder="Deskripsi"
                  value={dataInput.deskripsi}
                  onChange={(e) =>
                    setDataInput({ ...dataInput, deskripsi: e.target.value })
                  }
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <button
                type="button"
                className="p-3 rounded bg-slate-600 text-white m-1"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="p-3 rounded bg-green-600 text-white m-1"
              >
                Submit
              </button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewMhs;
