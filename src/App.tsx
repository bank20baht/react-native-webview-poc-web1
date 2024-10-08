import React, { useEffect, useState } from "react";

const WebApp = () => {
  const [messageFromReactNative, setMessageFromReactNative] = useState("");

  useEffect(() => {
    // @ts-ignore
    const messageHandler = (event) => {
      console.log("Message received from React Native:", event.data);
      setMessageFromReactNative(event.data);
    };

    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  const sendMessageToReactNative = () => {
    // @ts-ignore
    if (window.ReactNativeWebView) {
      // @ts-ignore
      window.ReactNativeWebView.postMessage("Hello from React Website!");
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

export default WebApp;
