module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }], // Transpile modern JS
    "@babel/preset-react", // If you're using React
  ],
};
