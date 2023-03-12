import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Button, Container, HStack, VStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("Search");
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
    setSearch("Search");
    window.scroll(0, 5);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  const handleSearch = () => {
    // system.console.log();
    return search === "Search" ? coins : coins.filter((coin) =>
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    );
  }

  if (error)
    return (
      <ErrorComponent message={"OOPS!!!!!      Error While Fetching Coins "} />
    );
  return (
    <Container
      maxW={"container.xl"}
      // bgColor={"blackAlpha.700"}
      w={"full"}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} padding={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>(₹) INR</Radio>
              <Radio value={"usd"}>($) USD</Radio>
              <Radio value={"eur"}>(€) EURO</Radio>
            </HStack>
          </RadioGroup>

          <VStack p={"4"} wrap={"wrap"} >
            <form className="d-flex" role="search">
              <input className="form-control me-2"
                type="search"
                placeholder="Search a Coin"
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search" />
              {/* <button className="btn btn-outline-success" type="submit" onClick={handleSearch()}>Search</button> */}
            </form>
          </VStack>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {handleSearch().map((i) => (
              <CoinCard
                id={i.id}
                key={i.id}
                name={i.name}
                price={i.current_price}
                img={i.image}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"whiteAlpha.900"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
