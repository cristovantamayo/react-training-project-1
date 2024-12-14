import React, { useDebugValue } from "react";

const useMediaQuery = (queryValue, initialValue = false) => {
  const [match, setMatch] = React.useState(initialValue);

  useDebugValue(`Query: ${queryValue}`, (name) => {
    return `Media query: ${name}`;
  });

  React.useEffect(() => {
    let isMounted = true;
    const matchMedia = window.matchMedia(queryValue);
    const handleChange = () => {
      if (!isMounted) {
        return;
      }

      setMatch(Boolean(matchMedia.matches));
    };

    matchMedia.addEventListener("change", handleChange);
    setMatch(Boolean(matchMedia.matches));

    return () => {
      isMounted = false;
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [queryValue]);

  return match;
};

export const Home = () => {
  const huge = useMediaQuery("(min-width: 600px)");
  const background = huge ? "green" : "yellow";
  return (
    <div style={{ fontSize: "60px", background }}>
      <h1>Oi</h1>
    </div>
  );
};
