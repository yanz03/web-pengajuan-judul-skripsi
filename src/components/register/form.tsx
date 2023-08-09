"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
  CircularProgress,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
export default function FormSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notif, setNotif]: any = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    nama: "",
    kode: "",
    angkatan: "",
    gender: "",
    nomor: "",
    email: "",
    password: "",
    confirmPassword: "",
    level: "mahasiswa",
  });

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post("/api/users/register", user);
    if (response.data.success) {
      setNotif("success");
      setMessage(response.data.message);
      setUser({
        nama: "",
        kode: "",
        angkatan: "",
        gender: "",
        nomor: "",
        email: "",
        password: "",
        confirmPassword: "",
        level: "mahasiswa",
      });
    } else {
      setNotif("error");
      setMessage(response.data.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={onRegister}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
            <Stack align={"start"} mb={4}>
              <Heading fontSize={"2xl"} textAlign={"start"}>
                Pendaftaran Akun Mahasiswa
              </Heading>
              <Text fontSize={"md"} color={"gray.600"}>
                Mohon isi data berikut dengan benar.
              </Text>
              {message !== "" && (
                <Alert status={notif}>
                  <AlertIcon />
                  {message}
                </Alert>
              )}
            </Stack>

            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <Input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={user.nama}
                  onChange={(e) => setUser({ ...user, nama: e.target.value })}
                />
              </FormControl>
              <FormControl id="nim" isRequired>
                <Input
                  type="number"
                  placeholder="Nim"
                  value={user.kode}
                  onChange={(e) => setUser({ ...user, kode: e.target.value })}
                />
              </FormControl>
              <FormControl id="gender">
                <Select
                  value={user.gender}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                >
                  <option>Gender</option>
                  <option value="perempuan">Perempuan</option>
                  <option value="laki-laki">Laki-laki</option>
                </Select>
              </FormControl>
              <FormControl id="angkatan">
                <Select
                  value={user.angkatan}
                  onChange={(e) =>
                    setUser({ ...user, angkatan: e.target.value })
                  }
                >
                  <option>Angkatan</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </Select>
              </FormControl>
              <FormControl id="NoTelp" isRequired>
                <Input
                  type="number"
                  placeholder="NO.Telp"
                  value={user.nomor}
                  onChange={(e) => setUser({ ...user, nomor: e.target.value })}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <Input
                  type="email"
                  placeholder="Alamat E-mail"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmpassword" isRequired>
                <InputGroup>
                  <Input
                    type={showConfPassword ? "text" : "password"}
                    placeholder="Konfirmasi Password"
                    value={user.confirmPassword}
                    onChange={(e) =>
                      setUser({ ...user, confirmPassword: e.target.value })
                    }
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowConfPassword(
                          (showConfPassword) => !showConfPassword
                        )
                      }
                    >
                      {showConfPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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
                  ) : null}
                  <span>Daftar</span>
                </button>
              </Stack>
              <Stack>
                <Link href="/login" fontSize={"sm"} textAlign={"center"}>
                  Sudah punya akun?
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
