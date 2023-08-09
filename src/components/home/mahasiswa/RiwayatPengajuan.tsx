import {
  Box,
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

const RiwayatPengajuan = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.post("/api/pengajuan/user");
      setData(response.data.data);
    };

    getData();
  }, []);
  return (
    <>
      {data.length === 0 ? (
        <Box padding={3} bg={"white"}>
          <Text>Tidak ada Riwayat</Text>
        </Box>
      ) : (
        <TableContainer bg={"white"}>
          <Table variant={"simple"}>
            <Thead>
              <Tr>
                <Th>Tanggal Pengajuan</Th>
                <Th>Status</Th>
                <Th>Alasan</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item: any) => {
                const tanggal_pengajuan = new Date(item.createdAt);
                let bg = "";
                if (item.status === "Berhasil") {
                  bg = "bg-green-300";
                } else if (item.status === "Ditolak") {
                  bg = "bg-red-300";
                } else {
                  bg = "bg-orange-300";
                }
                return (
                  <Tr key={item._id}>
                    <Td>{`${tanggal_pengajuan.toLocaleDateString()}`}</Td>
                    <Td>
                      <span className={`p-2 rounded-md  ${bg} text-white`}>
                        {item.status}
                      </span>
                    </Td>
                    <Td>{item.alasan}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default RiwayatPengajuan;
