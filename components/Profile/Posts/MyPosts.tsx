import React, { useEffect, useState } from "react";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import styles from "./Feed.module.css"; // Import the CSS module
import { PLATFORM_CONTRACT } from "../../../const/addresses";

interface Post {
  username: string;
  content: string;
  index: number;
}

export default function MyPosts() {
  const [feedData, setFeedData] = useState<{ usernames: string[]; contents: string[]; posts: Post[] }>({
    usernames: [],
    contents: [],
    posts: [],
  });

  const { contract } = useContract(PLATFORM_CONTRACT);
  const { data, isLoading } = useContractRead(contract, "getFeed", []);
  const address = useAddress(); // Get the address from the useAddress hook

  useEffect(() => {
    if (!isLoading && contract && data) {
      const [usernames, contents, addresses] = data;

      // Filter the posts based on the desired address
      const filteredPosts = usernames.reduce((acc: Post[], username: string, index: number) => {
        if (addresses && addresses.length > index && addresses[index] === address) {
          acc.push({ username, content: contents[index], index });
        }
        return acc;
      }, []);

      // Sort the filtered posts based on their index (order they are created)
      const sortedPosts = filteredPosts.sort((a: { index: number }, b: { index: number }) => a.index - b.index);

      setFeedData({ usernames, contents, posts: sortedPosts });
    }
  }, [isLoading, contract, data, address]);

  return (
    <div className={styles.feedCard}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Feed</h1>
          {feedData.posts.map((post: Post, index: number) => (
            <div className={styles.card} key={index}>
              <p className={styles.username}>{post.username}</p>
              <p className={styles.content}>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
