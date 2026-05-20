import esbuild from "esbuild";

esbuild.build({
  entryPoints: [
    "js/basic.jsx",
    "js/monkey.jsx",
    "js/stroke.jsx",
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
