import multer, { FileFilterCallback, Multer, StorageEngine } from 'multer';
import { Request } from 'express';

const fileStorage: StorageEngine = multer.memoryStorage();

const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    //just accept text files
    if (file.mimetype === 'text/plain') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const upload: Multer = multer({ storage: fileStorage, fileFilter: fileFilter });

export default upload;
