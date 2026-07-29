import type { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

export const handleInputErrors = (req : Request, res : Response, next : NextFunction) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    next()
}


export const validatePdf = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return res.status(400).json({error: 'Debes subir un archivo PDF'})
    }

    if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({error: 'El archivo debe ser un PDF'})
    }
    next()
}