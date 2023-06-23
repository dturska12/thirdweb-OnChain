import React, { useState, useEffect } from "react";
import { Web3Button } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import styles from "./Register.module.css";
import toastStyle from "../../util/toastConfig";
import { PLATFORM_CONTRACT } from "../../const/addresses"

export default function Register() {
  const [username, setUsername] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isAccountRegistered, setIsAccountRegistered] = useState(false);

  const router = useRouter();

  // Simulating the check for an existing registered account
  useEffect(() => {
    // Check if the connected wallet already has a registered account
    const isConnectedWalletRegistered = checkIfConnectedWalletIsRegistered();

    if (isConnectedWalletRegistered) {
      setIsAccountRegistered(true);
    }
  }, []);

  const checkIfConnectedWalletIsRegistered = () => {
    // Your logic to check if the connected wallet has a registered account
    // Return true if the account is registered, otherwise return false
    // Example: You can make a call to the blockchain to check if the wallet address is associated with a registered account
    // You might need to use a web3 library or interact with your smart contract

    return false; // Replace with your actual logic
  };

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handleAboutMeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setAboutMe(event.target.value);
  };

  const handleRegisterUser = (contract: { call: (arg0: string, arg1: string[]) => void; }) => {
    contract.call("registerUser", [username, aboutMe]);
    setShowModal(false);
    setIsAccountRegistered(true); // Update the state to indicate that the account is registered
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRegistrationSuccess = (txResult: any) => {
    toast("Account Created!", {
      icon: "🥳",
      style: toastStyle,
      position: "bottom-center",
    });
    router.push("/feed");
  };

  if (isAccountRegistered) {
    router.push("/feed"); // Redirect to the "/feed" page if the account is already registered
    return null; // Render nothing
  }

  return (
    <div className={styles.container}>
      <Web3Button
        contractAddress={PLATFORM_CONTRACT}
        action={openModal}
      >
        Create Account
      </Web3Button>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <h1>OnChain Social</h1>
            <label>Username:</label>
            <input type="text" value={username} onChange={handleUsernameChange} />
            <label>About Me:</label>
            <input type="text" value={aboutMe} onChange={handleAboutMeChange} />
            <Web3Button
              contractAddress={PLATFORM_CONTRACT}
              action={handleRegisterUser}
              onSuccess={handleRegistrationSuccess}
              className={styles.button}
            >
              Create Account
            </Web3Button>
          </div>
        </div>
      )}
    </div>
  );
}