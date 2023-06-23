import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Inbox from "../components/Inbox/Inbox";
import Container from "../components/Container/Container";
import Post from "../components/post"

export default function Feed() {

  return (
    <Container maxWidth="lg">
      <Inbox />
    </Container>
  );
}