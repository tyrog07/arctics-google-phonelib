import esbuild from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';
import { brotliCompressSync } from 'zlib';
import { execSync, spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function build() {
  try {
    execSync('tsc --declaration --emitDeclarationOnly --outDir dist/types');

    const esbuildOptions = {
      entryPoints: ['src/index.ts'],
      bundle: true,
      minify: true,
      splitting: true,
      sourcemap: 'external',
      sourcesContent: false, // Important: Omit original source in source maps
      metafile: true,
    };

    await esbuild.build({
      ...esbuildOptions,
      format: 'esm',
      outdir: 'dist/esm',
    });

    await esbuild.build({
      ...esbuildOptions,
      splitting: false,
      format: 'cjs',
      outdir: 'dist/cjs',
    });

    const filesToCompress = [
      'dist/esm/index.js',
      'dist/esm/index.js.map',
      'dist/cjs/index.js',
      'dist/cjs/index.js.map',
    ];

    filesToCompress.forEach((file) => {
      const contents = readFileSync(file);
      const compressed = brotliCompressSync(contents);
      writeFileSync(`${file}.br`, compressed);
    });

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
