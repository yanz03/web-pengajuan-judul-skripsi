"use client";
import { getDataUser } from "@/helpers/getDataUser";
import React, { useEffect, useState } from "react";
import FormPengajuan from "./formPengajuan";
import DashboardLayout from "@/components/layouts/Dashboard";
import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";

const ContentPagePengajuanJudul = ({ id }: any) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getDataUser().then((result) => {
      setUser(result);
    });
  }, []);

  if (user.length === 0)
    return (
      <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Spinner />
      </Flex>
    );
  return (
    <DashboardLayout user={user}>
      <Stack spacing={5}>
        <Text fontSize="2xl" color={"orange"}>
          Form Pengajuan Judul Skripsi
        </Text>
        <FormPengajuan id={id} />
      </Stack>
    </DashboardLayout>
  );
};

export default ContentPagePengajuanJudul;
