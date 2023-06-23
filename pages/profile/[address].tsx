import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { PLATFORM_CONTRACT } from "../../const/addresses";
import Container from "../../components/Container/Container";
import styles from "../../styles/Profile.module.css";

export default function ProfilePage() {
  const address = useAddress();
  const { contract } = useContract(PLATFORM_CONTRACT);
  const [userName, setUserName] = useState("");
  const [getAboutMe, setBio] = useState("");
  const { data: bioData, isLoading: bioLoading } = useContractRead(contract, "getAboutMe", [address]);
  const { data, isLoading } = useContractRead(contract, "getUsername", [address]);
  const { data: postsData, isLoading: postsLoading } = useContractRead(contract, "getPostsByAddress", [address]);

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
      <div className="profile-container">
        <h2 className="username">{userName}</h2>
        <p className="bio">{getAboutMe}</p>
        <h3 className="posts-heading">Posts:</h3>
        {postsLoading ? (
          <p className="loading">Loading posts...</p>
        ) : (
          <ul className="posts-list">
            {postsData.map((post: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined, index: Key | null | undefined) => (
              <li className="post" key={index}>{post}</li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
