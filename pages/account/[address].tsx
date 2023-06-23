import React, { useEffect, useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { PLATFORM_CONTRACT } from "../../const/addresses";
import Container from "../../components/Container/Container";
import styles from "../../styles/Profile.module.css";

interface Profile {
  address: string;
  username: string;
  bio: string;
  aboutMe: string;
}

export default function ProfilePage(): JSX.Element {
  const userAddress = "0x123456789"; // Replace with the user's wallet address

  const { contract } = useContract(PLATFORM_CONTRACT);

  const { data: profileData, isLoading: profileLoading } = useContractRead(contract, "getProfileByAddress", [userAddress]);
  const { data: aboutMeData, isLoading: aboutMeLoading } = useContractRead(contract, "getAboutMeByAddress", [userAddress]);

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!profileLoading && contract && profileData && aboutMeData) {
      const [address, username, bio] = profileData;
      const aboutMe = aboutMeData;
      setProfile({ address, username, bio, aboutMe });
    }
  }, [profileLoading, contract, profileData, aboutMeData]);

  return (
    <Container maxWidth="lg">
      <div className={styles.feedContainer}>
        {profileLoading || aboutMeLoading ? (
          <p>Loading...</p>
        ) : profile ? (
          <div>
            <h1>Profile</h1>
            <p>Address: {profile.address}</p>
            <p>Username: {profile.username}</p>
            <p>Bio: {profile.bio}</p>
            <p>About Me: {profile.aboutMe}</p>
          </div>
        ) : (
          <p>Profile not found.</p>
        )}
      </div>
    </Container>
  );
}