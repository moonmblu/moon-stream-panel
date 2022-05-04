import html from "@rollup/plugin-html";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import dotenv from "dotenv";

dotenv.config();

function env(keyPrefix = "MOON_PANEL_") {
  return JSON.stringify(
    Object.keys(process.env).reduce(function (env, key) {
      if (key.startsWith(keyPrefix)) {
        return { ...env, [key.slice(keyPrefix.length)]: process.env[key] };
      }
      return env
    }, {})
  );
}

export default {
  input: "index.ts",
  output: {
    file: "dist/index.js",
    format: "iife",
  },
  plugins: [
    typescript(),
    nodeResolve(),
    html(),
    replace({
      preventAssignment: true,
      ENV: env(),
    }),
  ],
};
