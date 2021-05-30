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
      My count is {this.state.count}
      <button onClick={handleEvent}>Increase Count</button>
    </div>
  );
};

export default ViewQuize;

class ViewQuize extends React.Component() {
  constructor() {
    super();
    this.state = {
      count: 0,
      view: null,
    };
  }

  handleEvent = () => {
    this.setState = count + 1;
  };

  render() {
    return (
      <div>
        My count is {this.state.count}
        <button onClick={this.handleEvent}>Increase Count</button>
      </div>
    );
  }
}
