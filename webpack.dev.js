import { internalIpV4 } from "internal-ip";
import { join } from "path";
import { merge } from "webpack-merge";
import commonConfiguration from "./webpack.common.js";
import portFinderSync from "portfinder-sync";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);

const infoColor = (_message) => {
  return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`;
};

console.log(join(__dirname, "/static"));

export default merge(commonConfiguration, {
  stats: "errors-warnings",
  mode: "development",
  devServer: {
    host: "local-ip",
    port: portFinderSync.getPort(8080),
    open: true,
    https: false,
    allowedHosts: "all",
    hot: false,
    watchFiles: ["src/**", "static/**"],
    static: {
      watch: true,
      directory: join(__dirname, "/static"),
    },
    client: {
      logging: "none",
      overlay: true,
      progress: false,
    },
    onAfterSetupMiddleware: async function (devServer) {
      const port = devServer.options.port;
      const https = devServer.options.https ? "s" : "";
      const localIp = await internalIpV4();
      const domain1 = `http${https}://${localIp}:${port}`;
      const domain2 = `http${https}://localhost:${port}`;

      console.log(
        `Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(
          domain2
        )}`
      );
    },
  },
});
