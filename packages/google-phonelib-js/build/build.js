const esbuild = require('esbuild');
const { readFileSync, writeFileSync } = require('fs');
const { brotliCompressSync } = require('zlib');

// Build configuration for CommonJS
esbuild
  .build({
    entryPoints: ['src/index.js'], // Entry point for your application
    bundle: true, // Bundle all dependencies
    minify: true, // Minify the output files
    format: 'cjs', // Output format (CommonJS)
    outdir: 'dist', // Output directory for CommonJS
    sourcemap: true, // Generate sourcemaps
    metafile: true, // Generate metafile for analysis
    target: ['node12'], // Target Node.js 12 and above
  })
  .then(() => {
    // Optionally compress files with Brotli
    const files = ['dist/index.js'];
    files.forEach((file) => {
      const contents = readFileSync(file);
      const compressed = brotliCompressSync(contents);
      writeFileSync(`${file}.br`, compressed);
    });
  })
  .catch(() => {
    //eslint-disable-next-line
    process.exit(1);
  });
