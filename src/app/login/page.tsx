import React from "react";
import FormLogin from "@/components/login/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Login",
  description: "Website pengajuan judul skripsi",
};
const page = () => {
  return (
    <>
      <FormLogin />
    </>
  );
};

export default page;
