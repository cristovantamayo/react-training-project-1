import React, { Suspense, useState } from "react";
//import LazyComponent from "./lazy-component";

const loadComponent = () => {
  console.log("loading component...");
  return import("./lazy-component");
};
const LazyComponent = React.lazy(loadComponent);

export const Home = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <p>
        <button onMouseOver={loadComponent} onClick={() => setShow((s) => !s)}>
          Display: {show ? "Show LazyComponent" : "No Component to show"}
        </button>
      </p>
      <Suspense fallback={<p>Loading...</p>}>
        {show && <LazyComponent />}
      </Suspense>
    </div>
  );
};
