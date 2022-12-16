// @generated: @expo/next-adapter@4.0.13
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-env"],
    plugins: [
      "nativewind/babel",
      "@babel/transform-runtime",
      ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
    ],
  };
};
