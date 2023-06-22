import React, { useState } from "react";
import { Web3Button } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import styles from "./Register.module.css";
import toastStyle from "../../util/toastConfig";

export default function Register() {
  const [username, setUsername] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handleAboutMeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setAboutMe(event.target.value);
  };

  const handleRegisterUser = (contract: { call: (arg0: string, arg1: string[]) => void; }) => {
    contract.call("registerUser", [username, aboutMe]);
    setShowModal(false);
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

  return (
    <div className={styles.container}>
      <Web3Button
        contractAddress="0x576a1a4aF7dBdFcBd08999050B68463682d8BC34"
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
            {/* <button onClick={closeModal}>Cancel</button> */}
            <Web3Button
              contractAddress="0x576a1a4aF7dBdFcBd08999050B68463682d8BC34"
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