// import { Text } from "@chakra-ui/react";
import { Box, Img } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { server } from "../index";

const Carousal = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);

  // const [loading, setLoading] = useState(true);
  // const [currency, setCurrency] = useState("inr");


  const currency = "inr";
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      const { data } = await axios.get(
        `${server}/coins/markets?vs_currency=inr&order=gecko_desc&per_page=10&page=1&price_change_percentage=24h`
      );
      setTrendingCoins(data);
    };
    fetchTrendingCoins();
  }, []);
  const items = trendingCoins.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0
    return (

      <Link
        to={`/coin/${coin.id}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "black",
        }}
      >
        <Box css={{ "&:hover": { transform: "scale(1.05)", } }}>
          <Img src={coin.image}
            alt={coin.name}
            height="70px"
            style={{ marginBottom: 10, marginRight: 10 }}
          />
          <span >
            <span style={{ paddingLeft: 3, paddingBottom: 1, color: "goldenrod" }}>
              {coin.symbol}
              &nbsp;
            </span>
            <span
              style={{
                color: profit > 0 ? "rgb(14,203,129)" : "red",
                fontWeight: 500,
                marginLeft: 5
              }}
            >
              {profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
          <br></br>
          <span style={{ color: "goldenrod", paddingLeft: 5, marginLeft: 5, fontSize: 19, fontWeight: 500 }}>
            {currencySymbol}{coin?.current_price}
          </span>

          {/* <Stat style={{ color: "goldenrod", paddingLeft: 5, marginLeft: 5, }}>
            <StatHelpText>
              <StatArrow
                type={
                  coin.price_change_percentage_24h > 0
                    ? "increase"
                    : "decrease"
                }
              />
              {currencySymbol}{coin?.price_change_percentage_24h?.toFixed(2)}%
            </StatHelpText>
          </Stat> */}

        </Box>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 1,
    },
    500: {
      items: 4,
    },
  };

  return (
    <div style={{ height: "25%", display: "flex", alignItems: "center" }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        keyboardNavigation
        paddingLeft={250}
        items={items}
        responsive={responsive}
      />
    </div>
  );
};

export default Carousal;
