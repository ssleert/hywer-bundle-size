import Bun from "bun"
import lightningcss from 'bun-lightningcss'

if (Bun.argv.length < 2) {
  console.log("no args")
  process.exit(1)
}
const devMode = Bun.argv[2] == "dev";

const buildConfig = {
  entrypoints: ["./app/index.jsx"],
  outdir: "./build",
  minify: devMode ? false : true,
  sourcemap: devMode ? "external" : "none",
  plugins: [lightningcss()],
}

const res = await Bun.build(buildConfig)
if (!res.success) {
  console.error("build failed: ")
  for (const msg of res.logs) {
    console.log(msg)
  }
  process.exit(1)
}

const indexHtml = Bun.file("./app/index.html")
if (indexHtml.size != 0) {
  const buildedHtml = Bun.file("./build/index.html")
  Bun.write(buildedHtml, indexHtml)
}

// google closure compiler magic
if (devMode == false) {
  await Bun.$`bun x uglify-js --compress --mangle -- ./build/index.js > ./build/index.optimized.js `
  await Bun.$`rm ./build/index.js`
  await Bun.$`mv ./build/index.optimized.js ./build/index.js`
  await Bun.$`brotli -9 ./build/index.js`
  await Bun.$`gzip -c -9 ./build/index.js > ./build/index.js.gz`
}

console.log("build completed")
