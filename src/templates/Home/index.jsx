import React, { useState, useLayoutEffect, useRef } from "react";

export const Home = () => {
  const [counted, setCounted] = useState([0, 1, 2, 3, 4]);

  const divRef = useRef(counted);

  useLayoutEffect(() => {
    const now = Date.now();
    while (Date.now() < now + 1000);
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [counted]);

  const handleClick = () => {
    setCounted((c) => [...c, c.slice(-1)[0] + 1]);
  };

  return (
    <>
      <button onClick={handleClick}>Count {counted?.slice(-1)}</button>
      <div
        ref={divRef}
        style={{ height: "100px", width: "100px", overflowY: "scroll" }}
      >
        {counted.map((c) => {
          return <p key={`c-${c}`}>{c}</p>;
        })}
      </div>
    </>
  );
};
