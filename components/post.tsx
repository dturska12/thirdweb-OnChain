import React, { useState } from "react";
import { Web3Button } from "@thirdweb-dev/react";
import styles from "./Post.module.css";
import { PLATFORM_CONTRACT } from "../const/addresses"

export default function Component() {
  const [postContent, setPostContent] = useState("");

  const handlePostContentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPostContent(event.target.value);
  };

  const handleCreatePost = (contract: { call: (arg0: string, arg1: string[]) => void; }) => {
    contract.call("createPost", [postContent]);
  };

  return (
    <div className={styles.container}>
      <h1>Whats on your mind...</h1>
      <textarea
        className={styles.textarea}
        placeholder="Enter your post content..."
        value={postContent}
        onChange={handlePostContentChange}
      />
      <Web3Button
        contractAddress={PLATFORM_CONTRACT}
        action={handleCreatePost}
        className={styles.button}
      >
        Create Post
      </Web3Button>
    </div>
  );
}
