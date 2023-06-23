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
  const address = useAddress();
  const { contract } = useContract(PLATFORM_CONTRACT);
  const { data, isLoading } = useContractRead(contract, "getUserContent", [address])
  const [userData, setUserData] = useState<UserData | null>(null);

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
      <div className={styles.profileHeader}>
        <h2 className={styles.username}>{userData.username}</h2>
        <p className={styles.aboutMe}>{userData.aboutMe}</p>
        </div>
        <div className={styles.feedContainer}>
        <ul className={styles.content}>
          {userData.posts.map((post, index) => (
            <li key={index}>{post}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
