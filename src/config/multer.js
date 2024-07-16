import multer from 'multer';
import { v4 } from 'uuid';
import { extname, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirnamePath = dirname(filename);

const multerConfig = {
  storage: multer.diskStorage({
    destination: resolve(dirnamePath, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      return callback(null, v4() + extname(file.originalname));
    },
  }),
};

export default multerConfig;
