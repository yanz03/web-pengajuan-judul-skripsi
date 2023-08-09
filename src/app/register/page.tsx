import { Metadata } from "next";
import FormSignUp from "@/components/register/form";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Pendaftaran Akun mahasiswa",
  description: "Pendaftaran akun mahasiswa",
};
export default function Register() {
  return (
    <>
      <Head>
        <title>Pendaftaran Akun</title>
      </Head>
      <FormSignUp />
    </>
  );
}
