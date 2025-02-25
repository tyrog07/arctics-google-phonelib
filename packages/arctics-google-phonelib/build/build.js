import esbuild from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';
import { brotliCompressSync } from 'zlib';
import { execSync } from 'child_process';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function build() {
  try {
    // Generate Type Definitions using TypeScript compiler
    execSync('tsc --declaration --emitDeclarationOnly --outDir dist/types');

    // Build configuration for ESM
    esbuild
      .build({
        entryPoints: ['src/index.ts'], // Entry point for your application
        bundle: true, // Bundle all dependencies
        minify: true, // Minify the output files
        splitting: true, // Enable code splitting
        format: 'esm', // Output format (ESM)
        outdir: 'dist', // Output directory for ESM
        sourcemap: true, // Generate sourcemaps
        metafile: true, // Generate metafile for analysis,
      })
      .then(() => {
        // Optionally compress files with Brotli
        const files = ['dist/index.js'];
        files.forEach((file) => {
          const contents = readFileSync(file);
          const compressed = brotliCompressSync(contents);
          writeFileSync(`${file}.br`, compressed);
        });
      });

    // Run the package.json creation script
    const buildPackageJsonProcess = spawn(
      'node',
      [path.join(__dirname, 'build-package-json.js')],
      {
        cwd: __dirname,
        stdio: 'inherit',
      },
    );

    return new Promise((resolve, reject) => {
      buildPackageJsonProcess.on('exit', (code) => {
        if (code === 0) {
          console.log('package.json created.');
          resolve();
        } else {
          reject(
            new Error(`build-package-json.js script failed with code ${code}`),
          );
        }
      });

      buildPackageJsonProcess.on('error', (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
