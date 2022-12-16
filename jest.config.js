module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: { __DEV__: true },
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
