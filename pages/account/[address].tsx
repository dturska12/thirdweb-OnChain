import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { PLATFORM_CONTRACT } from "../../const/addresses";
import Container from "../../components/Container/Container";
import styles from "../../styles/Profile.module.css";
import { useParams } from "react-router-dom";

interface ProfileProps {
  address: string;
}

interface UserData {
  username: string;
  aboutMe: string;
  posts: string[];
}

export default function Profile() {
  const { address } = useParams<{ address: string }>();
  const { contract } = useContract(PLATFORM_CONTRACT);
  const [userData, setUserData] = useState<UserData | null>(null);

  const { data, isLoading } = address ? useContractRead(contract, "getUserContent", [address]) : { data: undefined, isLoading: false };

  useEffect(() => {
    if (data) {
      const [username, aboutMe, posts] = data;
      setUserData({ username, aboutMe, posts });
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  if (!userData) return null;

  return (
    <Container maxWidth="lg">
    <div className={styles.container} >
      <div className={styles.profileHeader}>
        <h2 className={styles.username}>{userData.username}</h2>
        <p className={styles.aboutMe}>{userData.aboutMe}</p>
        </div>
        <div className={styles.posts}>
        <ul className={styles.posts}>
          {userData.posts.map((post, index) => (
            <li key={index}>{post}</li>
          ))}
        </ul>
      </div>
      </div>
    </Container>
  );
}

