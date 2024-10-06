import { useState, useEffect } from "react";

function App() {
  const [storedValue, setStoredValue] = useState<string>("");

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const messageFromApp = event.data;
        console.log("Message from React Native app:", messageFromApp);
        setStoredValue(messageFromApp);
      } catch (error) {
        console.error("Error handling message:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const sendInitialMessage = async () => {
      try {
        await window.postMessage("Hello from React!");
      } catch (error) {
        console.error("Error sending initial message:", error);
      }
    };

    sendInitialMessage();
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full min-h-screen">
      <h1 className="text-6xl font-bold text-center">
        React Native Webview POC
      </h1>
      <div className="text-2xl text-center">
        Try passing value from mobile to Web application
      </div>
      <p className="mt-4 text-2xl text-center">
        Stored Value From Mobile: {storedValue}
      </p>
    </div>
  );
}

export default App;
