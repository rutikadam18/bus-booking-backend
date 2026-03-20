import React from "react";
import BusCard from "./components/BusCard";

function App() {
  return (
    <div>
      <h1>Welcome Bokya</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <BusCard busName="Bus 1" />
        <BusCard busName="Bus 2" />
        <BusCard busName="Bus 3" />
      </div>
    </div>
  );
}

export default App;