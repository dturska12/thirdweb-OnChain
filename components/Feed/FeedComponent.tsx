import React, { useEffect, useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import styles from "./Feed.module.css"; // Import the CSS module

export default function Component() {
  const [feedData, setFeedData] = useState({ usernames: [], contents: [] });
  const { contract } = useContract("0x576a1a4aF7dBdFcBd08999050B68463682d8BC34");
  const { data, isLoading } = useContractRead(contract, "getFeed", []);

  useEffect(() => {
    if (!isLoading && contract && data) {
      const [usernames, contents] = data;
      setFeedData({ usernames, contents });
    }
  }, [isLoading, contract, data]);

  return (
    <div className={styles.feedCard}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Feed</h1>
          {feedData.usernames.map((username, index) => (
            <div className={styles.card} key={index}>
              <p className={styles.username}>{username}</p>
              <p className={styles.content}>{feedData.contents[index]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
