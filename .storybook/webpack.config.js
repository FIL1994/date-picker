const path = require("path");

module.exports = ({ config }) => {
  // remove default css loader
  config.module.rules = config.module.rules.filter(
    rule => rule.test.toString() !== "/\\.css$/"
  );

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [["react-app", { flow: false, typescript: true }]]
        }
      },
      {
        loader: require.resolve("react-docgen-typescript-loader")
      }
    ]
  });

  config.module.rules.push({
    test: [/\.css$/, /\.less$/],
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "less-loader",
        options: {
          paths: [path.resolve(__dirname, "../")]
        }
      }
    ],
    include: path.resolve(__dirname, "../")
  });

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [
      {
        loader: require.resolve("@storybook/addon-storysource/loader"),
        options: { parser: "typescript" }
      }
    ],
    enforce: "pre"
  });

  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
