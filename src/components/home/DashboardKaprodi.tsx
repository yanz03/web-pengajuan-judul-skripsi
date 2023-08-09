"use client";
import { Card, CardBody, Flex, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DashboardKaprodi = () => {
  const [pengajuan, setPengajuan]: any = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/api/pengajuan/count");
      setPengajuan(response.data.data);
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
        <Card w={"sm"} border={"2px"} borderColor={"blue"} bg={"blue.200"}>
          <CardBody color={"black"}>
            <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
              Diterima
            </Text>
            <Text fontSize={"xl"} textAlign={"center"}>
              {pengajuan.diterima}
            </Text>
          </CardBody>
        </Card>
        <Card w={"sm"} border={"2px"} borderColor={"orange"} bg={"orange.200"}>
          <CardBody color={"black"}>
            <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
              Dipending
            </Text>
            <Text fontSize={"xl"} textAlign={"center"}>
              0
            </Text>
          </CardBody>
        </Card>
        <Card w={"sm"} border={"2px"} borderColor={"red"} bg={"red.200"}>
          <CardBody color={"black"}>
            <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
              Ditolak
            </Text>
            <Text fontSize={"xl"} textAlign={"center"}>
              {pengajuan.ditolak}
            </Text>
          </CardBody>
        </Card>
      </Flex>
    </Stack>
  );
};

export default DashboardKaprodi;
