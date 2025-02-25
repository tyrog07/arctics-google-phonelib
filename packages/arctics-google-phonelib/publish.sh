#!/bin/bash

# Move the original package.json to a backup file
mv package.json original-package.json

# Copy the custom package.json to the root directory
cp dist/package.json package.json

# Copy the LICENSE and README.md files to the root directory
cp ../../LICENSE LICENSE
cp ../../README.md README.md

# Publish the package
npm publish --access public

# Remove the copied LICENSE and README.md files
rm LICENSE
rm README.md

# Restore the original package.json file
mv original-package.json package.json
