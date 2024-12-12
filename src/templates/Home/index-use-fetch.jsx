import React, { useState } from "react";
import { useFetch } from "./use-fetch";

export const Home = () => {
  const [postId, setPostId] = useState("");
  const urlTarget = "https://jsonplaceholder.typicode.com/posts/" + postId;
  const [result, loading] = useFetch(urlTarget, {
    method: "GET",
    headers: {
      "Content-Type": "application/json" + postId,
    },
  });

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
