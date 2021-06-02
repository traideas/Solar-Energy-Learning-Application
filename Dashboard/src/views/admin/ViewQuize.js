import React, { useState, useEffect } from "react";

const ViewQuize = () => {
  const [count, setCount] = useState(0);
  const [view, setView] = useState(null);
  const handleEvent = () => {
    setCount = count + 1;
    setView = view + 1
  }
  return (
    <div>
      My count is {count}
      <button onClick={handleEvent}>Increase Count</button>
    </div>
  );
};

export default ViewQuize;

