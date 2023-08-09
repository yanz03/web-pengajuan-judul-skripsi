"use client";
import { Card, CardBody, Flex, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DashboardStaf = () => {
  const [data, setData]: any = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/api/users/count");
      setData(response.data.data);
    };

    getData();
  }, []);

  return (
    <Stack spacing={5}>
      <Flex justifyContent={"center"}>
        <Stack textAlign={"center"}>
          <Text fontWeight={"bold"}>
            SELAMAT DATANG DI SISTEM PENGAJUAN JUDUL SKRIPSI
          </Text>
          <Text fontWeight={"bold"}>PROGRAM STUDI TEKNIK INFORMATIKA</Text>
        </Stack>
      </Flex>
      <Flex justifyContent={"space-around"} flexWrap={"wrap"} gap={"20px"}>
        <Card w={"sm"} bg={"green.300"}>
          <CardBody color={"white"}>
            <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
              Dosen
            </Text>
            <Text fontSize={"xl"} textAlign={"center"}>
              {data.dospem}
            </Text>
          </CardBody>
        </Card>
        <Card w={"sm"} bg={"green.300"}>
          <CardBody color={"white"}>
            <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
              Mahasiswa
            </Text>
            <Text fontSize={"xl"} textAlign={"center"}>
              {data.mahasiswa}
            </Text>
          </CardBody>
        </Card>
        <Card w={"sm"} bg={"green.300"}>
          <CardBody color={"white"}>
            <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
              Daftar Pengajuan
            </Text>
            <Text fontSize={"xl"} textAlign={"center"}>
              0
            </Text>
          </CardBody>
        </Card>
        <Card w={"sm"} bg={"green.300"}>
          <CardBody color={"white"}>
            <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
              Daftar Bimbingan
            </Text>
            <Text fontSize={"xl"} textAlign={"center"}>
              0
            </Text>
          </CardBody>
        </Card>
      </Flex>
    </Stack>
  );
};

export default DashboardStaf;
