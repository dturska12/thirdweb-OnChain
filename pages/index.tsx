import { useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css"; // Import the styles from the CSS file
import Register from "../components/Users/Register";

export default function Component() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterUser = async (contract: { call: (arg0: string, arg1: string[]) => any; }) => {
    setIsLoading(true);
    await contract.call("registerUser", [username, aboutMe]);
    setShowModal(false);
    // Additional logic after user registration
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <Register />
    </div>
  );
}
