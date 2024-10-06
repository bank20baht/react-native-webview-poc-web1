import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [messageFromReactNative, setMessageFromReactNative] = useState("");

  useEffect(() => {
    // Listen for messages from React Native WebView
    const messageHandler = (event: MessageEvent) => {
      console.log("Message received from React Native:", event.data);
      setMessageFromReactNative(event.data); // Update state with the received message
    };

    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  // Function to send a message back to React Native
  const sendMessageToReactNative = () => {
    // @ts-ignore
    if (window.ReactNativeWebView) {
      // @ts-ignore
      window.ReactNativeWebView.postMessage("Hello from React Website!");
    } else {
      console.error("ReactNativeWebView is not defined");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Website</h1>
      <div>
        <h2>Message from React Native:</h2>
        <p>{messageFromReactNative || "No message received yet"}</p>
      </div>
      <button onClick={sendMessageToReactNative}>
        Send Message to React Native
      </button>
    </div>
  );
};

export default App;
