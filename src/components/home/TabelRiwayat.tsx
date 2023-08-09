"use client";
import {
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
import Link from "next/link";
import React, { useEffect } from "react";

const TabelRiwayat = () => {
  const [data, setData] = React.useState([]);
  return (
    <TableContainer
      border={"1px"}
      borderColor={"gray.400"}
      rounded={"md"}
      w="90%"
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Tanggal Pengajuan</Th>
            <Th>Status</Th>
            <Th>Alasan</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map!((item: any) => {
            let color = "";
            let bg = "";
            let page = "";
            if (item.status === "Berhasil") {
              bg = "green.100";
              color = "green";
              page = "/page-berhasil";
            } else if (item.status === "Ditolak") {
              bg = "red.100";
              color = "red";
              page = "/page-ditolak";
            } else if (item.status === "Pending") {
              bg = "orange.100";
              color = "orange";
              page = "/page-pending";
            }
            return (
              <Tr key={item.id}>
                <Td>{item.tanggal}</Td>
                <Td>
                  <Link href={`${page}`}>
                    <Text
                      color={color}
                      bg={bg}
                      display={"inline"}
                      padding={"5px"}
                      rounded={"sm"}
                    >
                      {item.status}
                    </Text>
                  </Link>
                </Td>
                <Td>{item.alasan}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TabelRiwayat;
