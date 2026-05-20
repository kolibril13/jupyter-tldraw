import esbuild from "esbuild";

esbuild.build({
  entryPoints: [
    "js/minimal.jsx",
  ],
  bundle: true,
  minify: true,
  target: ["es2020"],
  outdir: "src/tldraw/static/",
  format: "esm",
  define: {
    'define.amd': 'false',
  },
});

// run with node node_config.mjs
