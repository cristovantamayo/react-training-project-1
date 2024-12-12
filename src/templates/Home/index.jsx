import React, { useState, useEffect, useRef } from "react";

const isObjectEqual = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB);
};

const useFetch = (url, options) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const urlRef = useRef(url);
  const optionsRef = useRef(options);

  useEffect(() => {
    let changed = false;

    if (!isObjectEqual(url, urlRef.current)) {
      urlRef.current = url;
      changed = true;
    }

    if (!isObjectEqual(options, optionsRef.current)) {
      optionsRef.current = options;
      changed = true;
    }

    if (changed) {
      setShouldLoad((s) => !s);
    }
  }, [url, options]);

  useEffect(() => {
    let wait = false;
    const controller = new AbortController();
    const signal = controller.signal;
    console.log("fetching... ", new Date().toLocaleString("pt-br"));
    console.log(optionsRef.current.headers);

    setLoading(true);

    const fetchData = async () => {
      await new Promise((r) => setTimeout(r, 1000));

      try {
        const response = await fetch(urlRef.current, {
          ...optionsRef.current,
          signal,
        });
        const json = await response.json();

        if (!wait) {
          setResult(json);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);

        if (!wait) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      wait = true;
      controller.abort();
    };
  }, [shouldLoad]);

  return [result, loading];
};

export const Home = () => {
  const [postId, setPostId] = useState("");
  const urlTarget = "https://jsonplaceholder.typicode.com/posts/" + postId;
  const [result, loading] = useFetch(urlTarget, {
    method: "GET",
    headers: {
      "Content-Type": "application/json" + postId,
    },
  });

  useEffect(() => {
    console.log("PostId: ", postId);
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleClick = (id) => {
    setPostId(id);
  };

  if (!loading && result) {
    return (
      <div>
        <h1>Posts</h1>
        {result?.length > 0 ? (
          result.map((post) => (
            <div key={`post-${post.id}`} onClick={() => handleClick(post.id)}>
              <p>{post.title}</p>
            </div>
          ))
        ) : (
          <div onClick={() => handleClick("")}>
            <p>{result.title}</p>
          </div>
        )}
      </div>
    );
  }

  return <h1>Oi</h1>;
};
