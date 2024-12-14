// Compound Components
import React, { Children, cloneElement } from "react"; // Adjust the path as necessary

const sOn = {
  style: {
    fontSize: "60px",
    background: "green",
  },
};

const sOff = {
  style: {
    fontSize: "60px",
    background: "red",
  },
};

const sBtn = {
  style: {
    marginTop: "25px",
    padding: "10px 20px 10px 20px",
    borderRadius: "7px",
    fontSize: "20px",
    background: "blue",
    color: "white",
  },
};

const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = React.useState(false);
  const onTurn = () => setIsOn((s) => !s);

  return Children.map(children, (child) => {
    const newChild = cloneElement(child, {
      isOn,
      onTurn,
    });
    return newChild;
  });
};

// eslint-disable-next-line
const TurnedOn = ({ isOn, children }) => (isOn ? children : null);
// eslint-disable-next-line
const TurnedOff = ({ isOn, children }) => (isOn ? null : children);
// eslint-disable-next-line
const TurnButton = ({ isOn, onTurn, ...props }) => {
  return (
    <button {...props} onClick={onTurn}>
      Turn {!isOn ? "ON" : "OFF"}
    </button>
  );
};

// eslint-disable-next-line
const P = ({ children }) => {
  const s = children === "On" ? sOn : sOff;
  return <p {...s}>{children}</p>;
};

export const Home = () => {
  return (
    //<Parent></Parent>
    <TurnOnOff>
      <TurnedOn>
        <P>On</P>
      </TurnedOn>
      <TurnedOff>
        <P>Off</P>
      </TurnedOff>
      <TurnButton {...sBtn} />
    </TurnOnOff>
  );
};
