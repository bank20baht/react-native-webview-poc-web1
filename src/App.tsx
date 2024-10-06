// App.tsx (React Website)
import React, { useEffect } from "react";

const App: React.FC = () => {
  useEffect(() => {
    // Listen for messages from React Native WebView
    const messageHandler = (event: MessageEvent) => {
      console.log("Message received from React Native:", event.data);
      alert(`Message from React Native: ${event.data}`);
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
      <button onClick={sendMessageToReactNative}>
        Send Message to React Native
      </button>
    </div>
  );
};

export default App;
