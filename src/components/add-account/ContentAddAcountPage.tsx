"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/Dashboard";
import axios from "axios";
import { Flex, Spinner } from "@chakra-ui/react";
import Form from "./form";
import { useRouter } from "next/navigation";

const ContentAddAccountPage = () => {
  const [user, setUser]: any = useState([]);
  const router = useRouter();
  const getData = async () => {
    const response = await axios.post("/api/users/me");
    setUser(response.data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  if (user.length === 0)
    return (
      <Flex justifyContent={"center"} minH={"100vh"} alignItems={"center"}>
        <Spinner />
      </Flex>
    );

  if (user.level !== "staf") {
    router.push("/");
    return (
      <Flex justifyContent={"center"} minH={"100vh"} alignItems={"center"}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <DashboardLayout user={user}>
      <Form />
    </DashboardLayout>
  );
};

export default ContentAddAccountPage;
