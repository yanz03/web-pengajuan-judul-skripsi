import { Stack, Text } from "@chakra-ui/react";
import React from "react";

const Intro = ({ nama }: any) => {
  return (
    <>
      <Stack>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          Hai, {nama}
        </Text>
      </Stack>
    </>
  );
};

export default Intro;
