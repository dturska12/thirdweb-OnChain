import React, { useState } from "react";
import { Web3Button } from "@thirdweb-dev/react";
import styles from "./Post.module.css";

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
      <h1>Create Post</h1>
      <textarea
        className={styles.textarea}
        placeholder="Enter your post content..."
        value={postContent}
        onChange={handlePostContentChange}
      />
      <Web3Button
        contractAddress="0x576a1a4aF7dBdFcBd08999050B68463682d8BC34"
        action={handleCreatePost}
        className={styles.button}
      >
        Create Post
      </Web3Button>
    </div>
  );
}
