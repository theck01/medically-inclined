const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { argsForFlag } = require('./helpers.js');
const { nextId, projectForId } = require('./model-helpers.js');

const store = require('../src/data/store.json');

const THUMBNAIL_DIMENSION_PX = 480;
const USAGE = `USAGE:

$ node path/to/add-img.js 
  -n "<image name>" 
  -f <path to image> 
  -p <project id> [<more project id> ...]
  [-t <path to image for alt text generation> [<more alt text images>...]]
`;

// STEP 1: Check all arguments before proceeding

const nameArgs = argsForFlag('-n');
const filePathArgs = argsForFlag('-f');
const projectParentArgs = argsForFlag('-p');
const altTextImageArgs = argsForFlag('-t');

if (nameArgs.length !== 1) {
  console.error('Missing well formated name argument');
  console.log(USAGE);
  process.exit(9);
}

const name = nameArgs[0];

if (filePathArgs.length !== 1) {
  console.error('Missing well formated file argument');
  console.log(USAGE);
  process.exit(9);
}

const filePath = filePathArgs[0];
if (!fs.existsSync(filePath)) {
  console.error(`Image ${filePath} does not exist`);
  process.exit(9);
}

if (projectParentArgs.length <= 0) {
  console.error('Missing project parents');
  console.log(USAGE);
  process.exit(9);
}

const projectParents = projectParentArgs.map((arg) => {
  const id = parseInt(arg, 10);
  if (isNaN(id)) {
    console.error('Project parent IDs must be decimal numbers');
    process.exit(9);
  }
  return id;
});

projectParents.forEach((parentId) => {
  if (!projectForId(store, parentId)) {
    console.error(`Project not found for parent id ${parentId}`);
    process.exit(9);
  }
});

const dataPath = path.resolve(__dirname, '../src/data');
const storePath = path.join(dataPath, 'store.json');
const imgExt = path.extname(filePath);
const newBaseName = name.toLowerCase().replace(/\s+/g, '-');
const newImageFile = path.join(dataPath, 'img',  `${newBaseName}${imgExt}`);
const newThumbImageFile = path.join(dataPath, 'img', `${newBaseName}.thumb${imgExt}`);

if (fs.existsSync(newImageFile) || fs.existsSync(newThumbImageFile)) {
  console.error(`Added image already exists:\n${newImageFile}\n${newThumbImageFile}`);
  process.exit(9);
}

if (altTextImageArgs.length > 0) {
  altTextImageArgs.forEach((arg) => {
    if (!fs.existsSync(arg)) {
      console.error(`Alt text source does not exist: ${arg}`);
      process.exit(9);
    }
  });
}


// STEP 2: Take steps to add image to store
const imgId = nextId(store);

async function runCommands() {
  let altText = '';
  if (altTextImageArgs.length > 0) {
    console.log('Generating alt text...');
    for (const path of altTextImageArgs) {
      const { stdout } = await exec(`tesseract ${path} stdout -l eng`);
      altText = altText ? `${altText}\n\n${stdout}` : stdout;
    }
  }

  console.log('Copying image into data directory...');
  await exec(`cp ${filePath} ${newImageFile}`);

  console.log('Generating thumbnail image...');
  await exec(`convert ${newImageFile} -resize ${THUMBNAIL_DIMENSION_PX}x${THUMBNAIL_DIMENSION_PX} ${newThumbImageFile}`);

  const addedImg = {
    id: imgId,
    name,
    altText,
    fileName: { 
      full: `${newBaseName}${imgExt}`,
      small: `${newBaseName}.thumb${imgExt}`,
    }
  };
  const storeCpy = { ...store };
  storeCpy.illustrations[imgId] = addedImg;
  projectParents.forEach((projectId) => {
    const project = projectForId(storeCpy, projectId);
    project.children.push(imgId);
  });
  console.log('Writing new data into store...');
  fs.writeFileSync(storePath, JSON.stringify(storeCpy, undefined, 2));

  console.log('Image added!');
  process.exit(0);
}

runCommands();
