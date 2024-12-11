import React, { useState, useEffect } from "react";

const global = {
  status: 0,
};

const useFetch = (url, options) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(0);

  useEffect(() => {
    if (global.status === 1) return;

    if (global.status === 0) {
      global.status = 1;
    }

    const fetchData = async () => {
      console.log("fetching... ", new Date().toLocaleString("pt-br"));
      await new Promise((r) => setTimeout(r, 3000));

      try {
        const response = await fetch(url, options);
        const json = await response.json();
        setResult(json);
        setLoading(false);
        setState(global.status);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    setLoading(true);
    fetchData();

    // eslint-disable-next-line
  }, [url, options, global]);

  return [result, loading, state, setState];
};

export const Home = () => {
  const [result, loading] = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
    {
      method: "GET",
    },
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && result) {
    console.log("success: ", result);
  }

  return <h1>Oi</h1>;
};
