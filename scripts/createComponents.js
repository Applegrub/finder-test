const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];
const componentPath = process.argv[3];

const componentTemplate = `import React from "react";
import { Box } from "@mui/material";

interface Props {}

const ${componentName}:React.FC<Props> = () => {
  return (
    <Box>
      
    </Box>
  );
};

export default ${componentName};`;

const indexTemplate = `import ${componentName} from './${componentName}';

export default ${componentName};`;

const createComponents = new Promise((resolve, reject) => {
  const fullPath = path.resolve(
    __dirname,
    '..',
    `./src/${componentPath}/${componentName}`
  );

  if (fs.existsSync(fullPath)) {
    reject('Components is exist');
  }

  fs.mkdir(fullPath, { recursive: true }, (err) => {
    if (err !== null) {
      reject(err);
    } else {
      resolve(fullPath);
    }
  });
});

createComponents
  .then(async (dirPath) => {
    await fs.writeFile(
      `${dirPath}/${componentName}.tsx`,
      componentTemplate,
      (err) => {
        if (err !== null) {
          Promise.reject(err);
        }
      }
    );

    return dirPath;
  })
  .then(async (dirPath) => {
    await fs.writeFile(`${dirPath}/index.ts`, indexTemplate, (err) => {
      if (err !== null) {
        console.log('Something wrong ', err);
      }
    });
    console.log(
      `>>>>: Я закончил создавать компонент ${componentName}, его вы найдете по пути ${dirPath}`
    );
  })
  .catch((err) => {
    console.log('####: THIS IS ERROR - ', err);
  });
