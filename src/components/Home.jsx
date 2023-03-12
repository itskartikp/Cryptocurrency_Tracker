import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btcSrc from "../assets/btc.png";
import { motion } from "framer-motion";
import Carousal from "./Carousal";

const Home = () => {


  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"110vh"}>
      <motion.div
        style={{ height: "70vh" }}
        animate={{
          translateY: "25px",
          translateX: "-25px",
          translateZ: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image w={"full"} h={"full"} objectFit={"contain"} src={btcSrc} />
      </motion.div>
      <Text
        fontSize={"50px"}
        textAlign={"center"}
        fontWeight={"bold"}
        color={"goldenrod"}
        mt={"-5"}
      >
        CryptoTracker
      </Text>
      <Carousal />

    </Box>
  );
};

export default Home;
