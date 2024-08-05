import esbuild from "esbuild";

esbuild.build({
  entryPoints: [
    "js/bidirectional_stroke.jsx",
    "js/coordinates.jsx",
    "js/get_stroke.jsx",
    "js/image_and_array.jsx",
    "js/image.jsx",
    "js/makereal.jsx",
    "js/makestatic_png.jsx",
    "js/makestatic_svg.jsx",
    "js/makestatic_tldraw.jsx",
    "js/makestatic_to_markdown.jsx",
    "js/minimal.jsx",
    "js/debug.jsx",
    "js/reactive_color_picker.jsx",


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