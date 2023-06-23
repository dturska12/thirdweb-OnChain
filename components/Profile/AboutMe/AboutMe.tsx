import { useEffect } from 'react';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import styles from './About.module.css';
import { PLATFORM_CONTRACT } from "../../../const/addresses"

interface AboutProps {
  userAddress: string;
}

const About: React.FC<AboutProps> = ({ userAddress }) => {
  const { contract } = useContract(PLATFORM_CONTRACT);
  const { data, isLoading, error } = useContractRead(contract, "getAboutMe", [userAddress]);

  useEffect(() => {
    // Perform any additional logic or side effects here
  }, []);

  if (isLoading) {
    return <div className={styles.container}><span className={styles.loading}>Loading...</span></div>;
  }

  return (
    <div className={styles.container}>
      <span className={styles.data}>About Me: {data}</span>
    </div>
  );
};

export default About;
