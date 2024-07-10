import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Card from "./Card";
import axios from "axios";

function Home() {
  const checkoutHandler = async (amount) => {

    const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey")

    const payload = { amount };
    const { data: { order }} = await axios.post(
      "http://localhost:4000/api/create-order",
      payload
    );

    const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Sandesh Payment",
        description: "RazorPay Payment Integration By Sandesh",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: "http://localhost:4000/api/payment-verification",
        prefill: {
            name: "Customer name",
            email: "customeremail@example.com",
            contact: "99999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };
  return (
    <Box>
      <Stack
        h={"100vh"}
        alignItems="center"
        justifyContent="center"
        direction={["column", "row"]}
      >
        <Card
          amount={100}
          img={
            "https://m.media-amazon.com/images/I/61Qe0euJJZL.jpg"
          }
          checkoutHandler={checkoutHandler}
        />
        <Card
          amount={200}
          img={
            "http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"
          }
          checkoutHandler={checkoutHandler}
        />
      </Stack>
    </Box>
  );
}

export default Home;
