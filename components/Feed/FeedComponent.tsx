import React, { useEffect, useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import styles from "./Feed.module.css"; // Import the CSS module
import { PLATFORM_CONTRACT } from "../../const/addresses"


export default function Component() {
  const [feedData, setFeedData] = useState({ usernames: [], contents: [], posts: [] });
  const { contract } = useContract(PLATFORM_CONTRACT);
  const { data, isLoading } = useContractRead(contract, "getFeed", []);

  useEffect(() => {
    if (!isLoading && contract && data) {
      const [usernames, contents] = data;

      // Combine usernames and contents into an array of objects
      const posts = usernames.map((username: any, index: string | number) => ({
        username,
        content: contents[index],
      }));

      // Sort the posts based on their index (order they are created)
      const sortedPosts = posts.sort((a: { index: number; }, b: { index: number; }) => a.index - b.index);

      setFeedData({ usernames, contents, posts: sortedPosts });
    }
  }, [isLoading, contract, data]);

  return (
    <div className={styles.feedCard}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Feed</h1>
          {feedData.posts.map((post: { username: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, index: React.Key | null | undefined) => (
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
