"use client";
import DashboardLayout from "@/components/layouts/Dashboard";
import { getDataUser } from "@/helpers/getDataUser";
import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TabelDaftarPengajuan from "./TabelDaftarPengajuan";
import { useRouter } from "next/navigation";

const Content = () => {
  const [user, setUser]: any = useState([]);
  const router = useRouter();
  useEffect(() => {
    getDataUser().then((result) => {
      setUser(result);
    });
  }, []);

  if (user.length === 0) {
    return (
      <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Spinner />
      </Flex>
    );
  }

  if (user.level === "mahasiswa" || user.level === "dospem") {
    router.push("/");
    return (
      <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Spinner />
      </Flex>
    );
  }
  return (
    <DashboardLayout user={user}>
      <Stack spacing={5}>
        <Text color="orange" fontSize="2xl">
          Daftar Pengajuan
        </Text>
        <TabelDaftarPengajuan user={user} />
      </Stack>
    </DashboardLayout>
  );
};

export default Content;
