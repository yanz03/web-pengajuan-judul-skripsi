"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  CircularProgress,
  Link,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
export default function FormLogin() {
  const [loading, setLoading] = useState(false);
  const [notif, setNotif]: any = useState("");
  const [message, setMessage] = useState("");
  const [kodeAcak, setKodeAcak]: any = useState();
  const [inputKode, setInputKode]: any = useState("");
  const [user, setUser] = useState({
    kode: "",
    password: "",
  });

  useEffect(() => {
    const kodeRandom = Math.floor(Math.random() * 100000);
    setKodeAcak(kodeRandom);
  }, []);

  const onSubmitFormLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (inputKode.toString() === kodeAcak.toString()) {
      const response = await axios.post("/api/users/login", user);
      if (response.data.success) {
        window.location.href = "/";
      } else {
        setNotif("error");
        setMessage(response.data.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setNotif("error");
      setMessage("Masukan angka yang anda lihat dengan benar!");
    }
  };
  return (
    <form onSubmit={onSubmitFormLogin}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={10}>
              <Stack align={"start"}>
                <Heading fontSize={"4xl"}>Masuk Akun</Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  Buat kamu yang sudah terdaftar, silahkan masuk ke akunmu.
                </Text>
                {message && (
                  <Alert status={notif}>
                    <AlertIcon />
                    {message}
                  </Alert>
                )}
              </Stack>
              <Stack spacing={4}>
                <FormControl id="kode" isRequired>
                  <FormLabel>Nim/Nidn</FormLabel>
                  <Input
                    type="text"
                    value={user.kode}
                    onChange={(e) => setUser({ ...user, kode: e.target.value })}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired id="verify">
                  <FormLabel>Masukan angka yang anda lihat</FormLabel>
                  <Flex alignItems={"center"} justifyContent={"space-around"}>
                    <Box>
                      <span className="font-bold">{kodeAcak}</span>
                    </Box>
                    <Box>
                      <Input
                        type="number"
                        value={inputKode}
                        onChange={(e) => setInputKode(e.target.value)}
                      />
                    </Box>
                  </Flex>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <button
                    disabled={loading}
                    className="w-full p-3 bg-blue-700 text-white rounded font-bold hover:bg-blue-500"
                    type="submit"
                  >
                    {loading ? (
                      <CircularProgress
                        isIndeterminate
                        color="blue.500"
                        size={"20px"}
                      />
                    ) : (
                      ""
                    )}
                    <span>Login</span>
                  </button>
                </Stack>
                <Stack>
                  <Link href="/register" fontSize={"sm"} textAlign={"center"}>
                    Belum punya akun?
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
