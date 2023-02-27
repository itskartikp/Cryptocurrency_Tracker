import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.800"}
      color={"rgb(212,175,55)"}
      minH={"58"}
      px={"16"}
      py={["15", "5"]}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"large"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            All About Crypto in a Single Go!!!!
          </Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            Track all the COINS and grow your money Exponentially!
          </Text>
        </VStack>
        {/* <VStack>
                <Avatar boxSize={"28"} mt={["4","0"]}/>
                <Text>Founder</Text>
            </VStack> */}
      </Stack>
    </Box>
  );
};

export default Footer;
