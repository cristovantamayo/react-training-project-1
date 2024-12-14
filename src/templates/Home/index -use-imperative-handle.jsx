import P from "prop-types";
import React, {
  useState,
  useLayoutEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

export const Home = () => {
  const [counted, setCounted] = useState([0, 1, 2, 3, 4]);

  const divRef = useRef(counted);

  useLayoutEffect(() => {
    const now = Date.now();
    while (Date.now() < now + 300);
    console.log(divRef.current.otherDivRef.scrollHeight);
    divRef.current.otherDivRef.scrollTop =
      divRef.current.otherDivRef.scrollHeight;
  }, [counted]);

  const handleClick = () => {
    setCounted((c) => [...c, c.slice(-1)[0] + 1]);
    divRef.current.handleOtherClick();
  };

  return (
    <>
      <button onClick={handleClick}>Count {counted?.slice(-1)}</button>
      <DisplayCounted counted={counted} ref={divRef} />
    </>
  );
};

export const DisplayCounted = forwardRef(function DisplayCounted(
  { counted },
  divRef,
) {
  const [rand, setRand] = useState("0.24");
  const otherDivRef = useRef();

  const handleOtherClick = () => {
    setRand(Math.random().toFixed(2));
  };

  useImperativeHandle(divRef, () => ({
    handleOtherClick,
    otherDivRef: otherDivRef.current,
  }));

  return (
    <div
      ref={otherDivRef}
      style={{ height: "100px", width: "100px", overflowY: "scroll" }}
    >
      {counted.map((c) => {
        return (
          <p onClick={handleOtherClick} key={`c-${c}`}>
            {c} +++ {rand}
          </p>
        );
      })}
    </div>
  );
});

DisplayCounted.propTypes = {
  counted: P.array,
};
