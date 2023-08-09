import {
  Alert,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewDospem = () => {
  const [myBimbingan, setMyBimbingan] = useState([]);
  const [msg, setMsg] = useState("");
  const getMyBimbingan = async () => {
    const response = await axios.get("/api/bimbingan/dospem");
    setMyBimbingan(response.data.data);
  };

  useEffect(() => {
    getMyBimbingan();
  }, []);

  const aktivasiBimbingan = async (id: String) => {
    const response = await axios.post("/api/bimbingan/aktivasi", {
      id: id,
    });

    if (response.data.success) {
      getMyBimbingan();
      setMsg(response.data.message);
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
        {msg && <Alert>{msg}</Alert>}

        <TableContainer bg={"white"}>
          <Table variant={"simple"}>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Pembimbing</Th>
                <Th>Tanggal Bimbingan</Th>
                <Th>Status</Th>
                <Th>Aksi</Th>
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
                    <Th>{item.nama_mahasiswa}</Th>
                    <Th>{item.tanggal_bimbingan}</Th>
                    <Th>{status}</Th>
                    <Th>
                      <button
                        onClick={() => aktivasiBimbingan(item._id)}
                        className="p-3 rounded bg-green-600 text-white"
                      >
                        Aktivasi
                      </button>
                    </Th>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
};

export default ViewDospem;
