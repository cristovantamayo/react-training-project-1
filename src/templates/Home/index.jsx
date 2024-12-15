// Compound Components
import React, {
  Children,
  cloneElement,
  createContext,
  useContext,
} from "react"; // Adjust the path as necessary

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

const TurnOnOffContext = createContext();

// eslint-disable-next-line
const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = React.useState(false);
  const onTurn = () => setIsOn((s) => !s);

  return (
    <TurnOnOffContext.Provider value={{ isOn, onTurn }}>
      {children}
    </TurnOnOffContext.Provider>
  );
};

// eslint-disable-next-line
const TurnedOn = ({ children }) => {
  const { isOn } = useContext(TurnOnOffContext);
  return isOn ? children : null;
};
// eslint-disable-next-line
const TurnedOff = ({ children }) => {
  const { isOn } = useContext(TurnOnOffContext);
  return isOn ? null : children;
};
// eslint-disable-next-line
const TurnButton = ({ ...props }) => {
  const { isOn, onTurn } = useContext(TurnOnOffContext);
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
      <div>
        <h2>Try</h2>
        <br />
        <TurnedOn>
          <P>On</P>
        </TurnedOn>
        <TurnedOff>
          <P>Off</P>
        </TurnedOff>
        <TurnButton {...sBtn} />
      </div>
    </TurnOnOff>
  );
};
