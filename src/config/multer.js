import multer from 'multer';
import { v4 } from 'uuid';
import { extname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      return callback(null, v4() + extname(file.originalname));
    },
  }),
};
