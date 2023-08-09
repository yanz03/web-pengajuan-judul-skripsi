"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/Dashboard";
import {
  Card,
  CardBody,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { getDataUser } from "@/helpers/getDataUser";

const ProfileContent = () => {
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
    <DashboardLayout user={user}>
      <Tabs>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Change password</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TableContainer bg={"white"}>
              <Table variant={"simple"}>
                <Tbody>
                  <Tr>
                    <Th>Nama</Th>
                    <Td>{user.nama}</Td>
                  </Tr>
                  <Tr>
                    <Th>Level</Th>
                    <Td>{user.level}</Td>
                  </Tr>
                  <Tr>
                    <Th>Kode</Th>
                    <Td>{user.kode}</Td>
                  </Tr>
                  <Tr>
                    <Th>Jenis kelamin</Th>
                    <Td>{user.gender}</Td>
                  </Tr>
                  <Tr>
                    <Th>Nomor</Th>
                    <Td>{user.nomor}</Td>
                  </Tr>
                  <Tr>
                    <Th>Email</Th>
                    <Td>{user.email}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <p>coming soon!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardLayout>
  );
};

export default ProfileContent;
