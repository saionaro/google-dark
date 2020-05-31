const { join } = require("path");
const fs = require("fs");
const { promisify } = require("util");

const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);

async function build() {
  const root = process.cwd();

  try {
    await mkdir(join(root, "dist"));
  } catch (e) {}

  await copyFile(
    join(root, "src/manifest.json"),
    join(root, "dist/manifest.json")
  );

  const targetImagesDir = join(root, "dist/images");
  const srcImagesDir = join(root, "src/images");

  try {
    await mkdir(targetImagesDir);
  } catch (e) {}

  const images = await readdir(srcImagesDir);

  for (const image of images) {
    await copyFile(join(srcImagesDir, image), join(targetImagesDir, image));
  }
}

build();
