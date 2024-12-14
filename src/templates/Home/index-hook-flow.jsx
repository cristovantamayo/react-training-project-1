import React, { useRef, useEffect, useState, useLayoutEffect } from "react"; // Adjust the path as necessary

export const ReactHooks = () => {
  console.log("%cCHILD RENDER STARTING...", "color: green");

  // Lazy Initializer #1
  const [state1, setState1] = useState(() => {
    const state = new Date().toLocaleDateString();
    console.log(
      "%cState Lazy initializer - (useState + InitialValue) = " + state,
      "color: green",
    );
    return state;
  });
  const renders = useRef(0);

  useEffect(() => {
    console.log("%cuseEffect (UPDATE state1) " + state1, "color: #dbc70f");
  }, [state1]);

  useEffect(() => {
    console.log("%cuseEffect -> No Dependencies", "color: #dbc70f");
    renders.current += 1;

    return () => {
      console.log("%cuseEffect (Cleanup) -> No Dependencies", "color: #dbc70f");
    };
  });

  useEffect(() => {
    console.log("%cuseEffect -> Empty dependencies", "color: #dbc70f");

    return () => {
      console.log(
        "%cuseEffect (Cleanup) -> Empty dependencies",
        "color: #dbc70f",
      );
    };
  }, []);

  useLayoutEffect(() => {
    console.log("%cuseLayoutEffect", "color: #e61a4d");

    return () => {
      console.log("%cuseLayoutEffect (Cleanup)", "color: #e61a4d");
    };
  });

  console.log(
    "%cCHILD RENDER " + renders.current + " ENDING...",
    "color: green",
  );
  return (
    <div
      onClick={() => setState1(new Date().toLocaleString("pt-br"))}
      style={{ fontSize: "60px" }}
    >
      State: {state1}
    </div>
  );
};

export const Home = () => {
  const renders = useRef(0);

  useEffect(() => {
    renders.current += 1;
  }, []);

  console.log(
    `%cParent Renders: ${renders.current} Starting...`,
    "color: green",
  );
  const [show, setShow] = useState(false);
  console.log(
    `%cState Initializer -(useState + InitialValue) = ${show}`,
    "color: green",
  );
  console.log(`%cParent Renders: ${renders.current} Ending...`, "color: green");

  return (
    <div>
      <p style={{ fontSize: "60px" }} onClick={() => setShow((s) => !s)}>
        Show hooks!
      </p>
      {show && <ReactHooks />}
    </div>
  );
};
