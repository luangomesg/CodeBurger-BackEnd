import multer from 'multer'
import { v4 } from 'uuid'
import { extname, resolve } from 'path'

const multerConfig = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      return callback(null, v4() + extname(file.originalname))
    },
  }),
}

export default multerConfig
