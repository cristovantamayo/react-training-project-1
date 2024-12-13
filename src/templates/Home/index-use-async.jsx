import React, { useState, useEffect, useCallback } from "react";

const useAsync = (asyncFunction, shouldRun) => {
  const [state, setState] = useState({
    result: null,
    error: null,
    status: "idle",
  });
  const run = useCallback(() => {
    console.log("running...", new Date().toLocaleString("pt-br"));
    setState({
      result: null,
      error: null,
      status: "pending",
    });

    return asyncFunction()
      .then((response) => {
        setState({
          result: response,
          error: null,
          status: "resolved",
        });
      })
      .catch((error) => {
        setState({
          result: null,
          error: error,
          status: "rejected",
        });
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (shouldRun) {
      run();
    }
  }, [run, shouldRun]);

  return [run, state.result, state.error, state.status];
};

const fetchData = async () => {
  await new Promise((r) => setTimeout(r, 2000));
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const json = await response.json();

  return json;
};

export const Home = () => {
  const [reFetchData, result, error, status] = useAsync(fetchData, true);

  const handleClick = () => {
    reFetchData();
  };

  if (status === "idle") {
    return <pre>Start your journey by clicking the button below</pre>;
  }
  if (status === "pending") {
    return <pre>Loading...</pre>;
  }
  if (status === "rejected") {
    return <pre>{error.message}</pre>;
  }

  return <pre onClick={handleClick}>{JSON.stringify(result, null, 2)}</pre>;
};
