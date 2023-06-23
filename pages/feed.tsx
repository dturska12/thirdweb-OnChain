import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import FeedComponent from "../components/Feed/FeedComponent";
import Container from "../components/Container/Container";
import Post from "../components/post"

export default function Feed() {

  return (
    <Container maxWidth="lg">
      <Post />
      <FeedComponent />
    </Container>
  );
}