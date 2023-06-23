import React, { useEffect, useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import styles from "./Feed.module.css"; // Import the CSS module
import { PLATFORM_CONTRACT } from "../../const/addresses";

interface Post {
  [x: string]: any;
  address: string;
  username: string;
  content: string;
}

export default function Component(): JSX.Element {
  const [feedData, setFeedData] = useState<{ usernames: string[]; contents: string[]; posts: Post[] }>({
    usernames: [],
    contents: [],
    posts: [],
  });
  const { contract } = useContract(PLATFORM_CONTRACT);
  const { data, isLoading } = useContractRead(contract, "getFeed", []);

  useEffect(() => {
    if (!isLoading && contract && data) {
      const [addresses, usernames, contents] = data;

      const posts: Post[] = addresses.map((address: string, index: number) => ({
        address,
        username: usernames[index],
        content: contents[index],
      }));

      const sortedPosts = posts.sort((a, b) => a.index - b.index);

      setFeedData({ usernames, contents, posts: sortedPosts });
    }
  }, [isLoading, contract, data]);

  const handleUsernameClick = (address: string) => {
    // Redirect to the profile page with the associated address
    window.location.href = `/account/${address}`;
  };

  return (
    <div className={styles.feedCard}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Feed</h1>
          {feedData.posts.map((post: Post, index: number) => (
            <div className={styles.card} key={index}>
              <p
                className={styles.username}
                onClick={() => handleUsernameClick(post.address)}
              >
                {post.username}
              </p>
              <p className={styles.content}>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
