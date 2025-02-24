#!/bin/bash

# Hardcoded repository URL (replace with your repo URL)
repo_url="https://github.com/google/libphonenumber.git"
folder_to_copy="javascript/i18n/phonenumbers"                         # Replace with the folder you want to copy
destination_dir="./glib"   # Replace with your destination directory

# Get the latest tag
latest_tag=$(git ls-remote --tags --sort='-v:refname' "$repo_url" | grep -o 'refs/tags/.*' | sed 's:refs/tags/::' | head -n 1)

if [ -z "$latest_tag" ]; then
  echo "No tags found in the repository."
  exit 1
fi

# Strip the tag (remove non-version characters)
stripped_tag=$(echo "$latest_tag" | grep -oP 'v\d+\.\d+\.\d+')

if [ -z "$stripped_tag" ]; then
    echo "Could not extract version from tag: $latest_tag"
    exit 1
fi

echo "Extracted tag: $stripped_tag"

# Construct the zip URL using the stripped tag
zip_url="https://github.com/$(echo "$repo_url" | awk -F'github.com/' '{print $2}' | awk -F'/' '{print $1}')/$(echo "$repo_url" | awk -F'github.com/' '{print $2}' | awk -F'/' '{print $2}' | sed 's/\.git$//')/archive/refs/tags/$stripped_tag.zip"

# Download the zip file
zip_filename="$stripped_tag.zip"
curl -L -o "$zip_filename" "$zip_url"

if [ $? -ne 0 ]; then
  echo "Error downloading zip file. Please check the URL and your network connection."
  exit 1
fi

echo "Repository zip downloaded to '$zip_filename'"

# Extract the zip file
unzip "$zip_filename"

if [ $? -ne 0 ]; then
  echo "Error extracting zip file."
  rm "$zip_filename"
  exit 1
fi

# Determine the extracted folder name (usually repo-tag)
extracted_folder=$(unzip -Z1 "$zip_filename" | head -n 1 | cut -d/ -f1)

# Copy the specified folder to the destination directory
if [ -d "$extracted_folder/$folder_to_copy" ]; then
    cp -r "$extracted_folder/$folder_to_copy" "$destination_dir"

    if [ $? -ne 0 ]; then
        echo "Error copying folder '$folder_to_copy' to '$destination_dir'."
        rm "$zip_filename" -rf "$extracted_folder"
        exit 1
    fi
else
    echo "Folder '$folder_to_copy' not found in the extracted archive."
    rm "$zip_filename" -rf "$extracted_folder"
    exit 1
fi

# Clean up the extracted repository and zip file
rm "$zip_filename" -rf "$extracted_folder"

echo "Folder '$folder_to_copy' copied to '$destination_dir' successfully."