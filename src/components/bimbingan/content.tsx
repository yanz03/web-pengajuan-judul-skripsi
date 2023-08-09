"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/Dashboard";
import { getDataUser } from "@/helpers/getDataUser";
import { Flex, Spinner } from "@chakra-ui/react";
import ViewMhs from "./ViewMhs";
import ViewDospem from "./ViewDospem";
import axios from "axios";

const ContentPageBimbingan = () => {
  const [user, setUser]: any = useState([]);
  const [pembimbing, setPembimbing]: any = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post("/api/users/me");
      setUser(response.data.data);
      setPembimbing(response.data.pembimbing);
    };
    getData();
  }, []);

  if (user.length === 0)
    return (
      <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Spinner />
      </Flex>
    );
  return (
    <>
      <DashboardLayout user={user}>
        {user.level === "mahasiswa" ? (
          <ViewMhs
            nama_mahasiswa={user.nama}
            id_mahasiswa={user._id}
            pembimbing={pembimbing}
          />
        ) : (
          <ViewDospem />
        )}
      </DashboardLayout>
    </>
  );
};

export default ContentPageBimbingan;
