import { Stack, Text } from "@chakra-ui/react";
import React from "react";

const Info = () => {
  return (
    <>
      <Stack spacing={2}>
        <Text>
          Daftarkan judul kamu dan tunggu hasilnya, klik tombol{" "}
          <strong>Gabung</strong> untuk melanjutkan pengajuan .
        </Text>
      </Stack>
    </>
  );
};

export default Info;
