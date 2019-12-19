import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import strip from "rollup-plugin-strip";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import nodeBuiltins from "rollup-plugin-node-builtins";
import nodeGlobals from "rollup-plugin-node-globals";
import pkg from "./package.json";

export default [
  // browser-friendly UMD build
  {
    input: "src/index.js",
    output: {
      name: "stylusStandalone",
      file: pkg.main,
      format: "iife"
    },
    plugins: [
      commonjs(),
      nodeBuiltins(),
      nodeGlobals(),
      nodeResolve({ mainFields: ["browser", "main"] }),
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true,
        babelrc: false,
        presets: [
          [
            "@babel/env",
            {
              modules: false,
              targets: {
                ie: 11
              }
            }
          ]
        ],
        plugins: [
          [
            "@babel/transform-runtime",
            {
              corejs: 3
            }
          ]
        ]
      }),
      strip({
        debugger: false,
        functions: [
          "console.*",
          "console.warn.apply",
          "console.info.apply",
          "console.debug.apply",
          "console.error.apply"
        ]
      }),
      // Minimize module size
      terser()
    ]
  }
];
