import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const runTest = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/run-test", {
        url,
        platform: "shopify",
      });
      setResult(res.data);
    } catch (err) {
      console.error("Error running test:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ecommerce Test Automation</h1>
      <input
        type="text"
        placeholder="Enter product URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "400px", marginRight: "10px" }}
      />
      <button onClick={runTest}>Run Test</button>

      {result && (
        <pre style={{ textAlign: "left", marginTop: "20px" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
