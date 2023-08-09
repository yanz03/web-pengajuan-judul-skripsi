import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";

const InfoPengajuanJudul = () => {
  return (
    <Flex
      w={"100%"}
      mt={10}
      justifyContent={"start"}
      gap="10px"
      alignItems={"center"}
    >
      <Box
        maxW={"100%"}
        padding={"10px"}
        border={"1px"}
        rounded={"md"}
        borderColor={"gray.400"}
      >
        <Flex justifyContent={"space-between"} gap={"20px"}>
          <Box>
            <Stack spacing={2}>
              <Text>Pendaftaran Dibuka</Text>
              <Text align={"center"} fontWeight={"bold"}>
                1 Mei 2023
              </Text>
            </Stack>
          </Box>
          <Box>
            <Stack spacing={2}>
              <Text>Pendaftaran Terakhir</Text>
              <Text align={"center"} fontWeight={"bold"}>
                30 Mei 2023
              </Text>
            </Stack>
          </Box>
        </Flex>
      </Box>
      <Button
        color={"blue.500"}
        border={"1px"}
        borderColor={"blue.500"}
        rounded={"md"}
      >
        Ajukan
      </Button>
    </Flex>
  );
};

export default InfoPengajuanJudul;
