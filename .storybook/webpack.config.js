const path = require("path");

module.exports = ({ config, mode }) => {
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

  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
