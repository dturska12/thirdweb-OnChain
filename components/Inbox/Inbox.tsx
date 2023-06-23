import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";

const Message = () => {
  const { _messageId } = useParams();
  const { contract } = useContract("0x576a1a4aF7dBdFcBd08999050B68463682d8BC34");

  // Get the user's wallet address
  const [userAddress, setUserAddress] = useState("");
  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        // Check if the user has a connected wallet
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setUserAddress(address);
        }
      } catch (error) {
        console.log("Error fetching user address:", error);
      }
    };

    fetchUserAddress();
  }, []);

  const { data, isLoading } = useContractRead(
    contract,
    "getMessageContent",
    [userAddress, _messageId]
  );
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    if (data) {
      setMessageContent(data);
    }
  }, [data]);

  return (
    <div>
      <h1>Message</h1>
      {isLoading ? (
        <p>Loading message content...</p>
      ) : (
        <p>{messageContent}</p>
      )}
    </div>
  );
};

export default Message;
