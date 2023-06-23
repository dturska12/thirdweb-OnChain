import { SetStateAction, useState } from "react";
import { Web3Button } from "@thirdweb-dev/react";
import { PLATFORM_CONTRACT } from "../../const/addresses"
import styles from "./Message.module.css"; // Import the CSS module

export default function ChatComponent() {
  const [receiver, setReceiver] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<{ receiver: string; content: string; }[]>([]);

  const handleReceiverChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setReceiver(event.target.value);
  };

  const handleContentChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Perform actions with receiver and content
    console.log("Receiver:", receiver);
    console.log("Content:", content);
    // Call smart contract or perform any other logic with receiver and content

    // Update messages state with the new message
    const newMessage = {
      receiver,
      content,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Clear input fields
    setReceiver("");
    setContent("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.messageBox}>
        <h3>Previous Messages:</h3>
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            <span className={styles.messageReceiver}>{message.receiver}: </span>
            <span className={styles.messageContent}>{message.content}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Receiver Address:
          <input
            type="text"
            value={receiver}
            onChange={handleReceiverChange}
            className={styles.input}
          />
        </label>
        <br />
        <label>
          Message Content:
          <textarea
            value={content}
            onChange={handleContentChange}
            className={styles.textarea}
          ></textarea>
        </label>
        <br />
        <Web3Button
          contractAddress={PLATFORM_CONTRACT}
          action={(contract) => {
            contract.call("sendMessage", [receiver, content]);
          }}
          className={styles.button}
        >
          Send Message
        </Web3Button>
      </form>
    </div>
  );
}
