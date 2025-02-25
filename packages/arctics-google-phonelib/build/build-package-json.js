import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Determine the Subpackage Root Directory:
// This is the most robust way to find the subpackage root.  It assumes
// the script is located in the subpackage's directory.
const subPackageRootDir = path.join(__dirname, '../'); // The current directory is the subpackage root

// 2. Construct Paths to package.json files:
const rootPackagePath = path.join(__dirname, '../../../package.json'); // Path to root package.json (adjust relative path as needed)
const subPackagePath = path.join(subPackageRootDir, 'package.json'); // Path to subpackage's package.json
const distPackageJsonPath = path.join(
  subPackageRootDir,
  'dist',
  'package.json',
); // Path to dist package.json

// 3. Load package.json files:
const rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));
const subPackage = JSON.parse(fs.readFileSync(subPackagePath, 'utf8'));

const otherSubpackageDependencies = [
  '@arctics/google-phonelib-js',
  'google-closure-compiler',
  'google-closure-library',
]; // Add other subpackage names here

const buildPackage = {
  name: subPackage.name,
  description: subPackage.description,
  version: subPackage.version,
  homepage: subPackage.homepage,
  repository: subPackage.repository,
  type: subPackage.type,
  main: subPackage.main, // If you have a main entry point
  module: subPackage.module, // If you have a module entry point
  types: subPackage.types, // If you have a types entry point
  license: subPackage.license,
  dependencies: subPackage.dependencies || {},
  devDependencies: {},
  files: subPackage.files || [], // if you have files array in subpackage,
  scripts: subPackage.scripts || {}, // if you have scripts in subpackage
  keywords: subPackage.keywords || [], // if you have keywords in subpackage
};

for (const dep in rootPackage.devDependencies) {
  if (!otherSubpackageDependencies.includes(dep)) {
    buildPackage.devDependencies[dep] = rootPackage.devDependencies[dep];
  }
}

for (const otherSubpackageDependency of otherSubpackageDependencies) {
  if (buildPackage.dependencies[otherSubpackageDependency]) {
    delete buildPackage.dependencies[otherSubpackageDependency];
  }
}

fs.writeFileSync(
  distPackageJsonPath, // Write to the dist directory
  JSON.stringify(buildPackage, null, 2),
);

console.log('Build package.json created successfully!');
