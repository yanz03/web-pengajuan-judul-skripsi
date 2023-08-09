// app/page.tsx
"use client";
import DashboardKaprodi from "@/components/home/DashboardKaprodi";
import DashboardMahasiswa from "@/components/home/DashboardMahasiswa";
import DashboardStaf from "@/components/home/DashboardStaf";
import Intro from "@/components/home/Intro";
import TabelRiwayat from "@/components/home/TabelRiwayat";
import Info from "@/components/home/info";
import InfoPengajuanJudul from "@/components/home/infoPengajuanJudul";
import DashboardLayout from "@/components/layouts/Dashboard";
import { getDataUser } from "@/helpers/getDataUser";
import { Link } from "@chakra-ui/next-js";
import {
  Flex,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser]: any = useState([]);
  useEffect(() => {
    getDataUser().then((result) => {
      setUser(result);
    });
  }, []);

  if (user.length === 0)
    return (
      <Flex justifyContent={"center"} minH={"100vh"} alignItems={"center"}>
        <Spinner />
      </Flex>
    );
  return (
    <>
      <DashboardLayout user={user}>
        <Text color="orange" fontSize="2xl">
          Dashboard
        </Text>
        <Stack spacing={5}>
          <Intro nama={user.nama} />
          {user.level === "mahasiswa" ? (
            <DashboardMahasiswa user={user} />
          ) : null}
          {user.level === "staf" ? <DashboardStaf /> : null}

          {user.level === "kaprodi" ? <DashboardKaprodi /> : null}
        </Stack>
      </DashboardLayout>
    </>
  );
}
