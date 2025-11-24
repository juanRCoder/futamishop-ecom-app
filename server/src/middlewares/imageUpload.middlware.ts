import { HttpStatus } from "@server/constants/HttpStatus";
import { apiResponse } from "@server/utils/apiResponse.utils";
import { Request, Response, NextFunction } from "express";
import multer, { StorageEngine, MulterError } from "multer";

const storage: StorageEngine = multer.memoryStorage();

export const uploader = (fieldName: string) => {
  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (_req, file, callback) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.mimetype)) {
        return callback(new Error("Tipo de archivo no permitido"));
      }
      callback(null, true);
    },
  }).single(fieldName);

  return (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err) => {
      if (err instanceof MulterError) {
        switch (err.code) {
          case "LIMIT_FILE_SIZE":
            return res.status(HttpStatus.BAD_REQUEST).json({
              error: "El archivo es demasiado pesado. Maximo 5MB permitido.",
            });
          case "LIMIT_FIELD_COUNT":
            return res.status(HttpStatus.BAD_REQUEST).json(
              apiResponse(false, {
                message: "Se excedió el número máximo de archivos permitidos.",
              })
            );
          case "LIMIT_UNEXPECTED_FILE":
            return res.status(HttpStatus.BAD_REQUEST).json(
              apiResponse(false, {
                message: "Archivo inesperado encontrado.",
              })
            );
          default:
            return res.status(HttpStatus.BAD_REQUEST).json(
              apiResponse(false, {message: `Error de subida: ${err.message}`})
            );
        }
      } else if (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(
          apiResponse(false, {message: err.message}));
      }
      next();
    });
  };
};
