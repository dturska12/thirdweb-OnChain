import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { PLATFORM_CONTRACT } from "../../const/addresses";
import Post from "../../components/post"
import Container from "../../components/Container/Container";
import styles from "../../styles/Profile.module.css"
import MyPosts from "../../components/Profile/Posts/MyPosts";
import FeedComponent from "../../components/Feed/FeedComponent";

export default function ProfilePage() {
  const address = useAddress();
  const { contract } = useContract(PLATFORM_CONTRACT);
  const [userName, setUserName] = useState("");
  const [getAboutMe, setBio] = useState("");
  const { data: bioData, isLoading: bioLoading } = useContractRead(contract, "getAboutMe", [address]);


  const { data, isLoading } = useContractRead(contract, "getUsername", [address]);

  useEffect(() => {
    if (!isLoading && data) {
      setUserName(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!bioLoading && bioData) {
      setBio(bioData);
    }
  }, [bioData, bioLoading]);

  useEffect(() => {
    if (!address) {
    }
  }, [address]);

  return (
    <Container maxWidth="lg">
      <div className={styles.profile}>
        <h2>{userName}</h2>
        <p>{getAboutMe}</p>
      </div>
      <Post />
      <FeedComponent />
    </Container>
  );
}

