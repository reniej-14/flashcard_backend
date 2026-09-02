import { Router } from "express";
import { body, param } from "express-validator";
import { createDecks, deleteDeck, getCards, getDeckById, getDecks, updateCard,  } from "./handlers";
import { handleInputErrors, validatePdf } from "./middleware/validation";
import { upload } from "./config/multer";

const router = Router()

router.post('/decks',
    upload.single('pdf'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Debes asignarle un nombre al mazo'),
    body('visitorId')
        .trim()
        .notEmpty()
        .withMessage('No se encontró el identificador del visitante'),
    handleInputErrors,
    validatePdf,
    createDecks
)

router.get('/decks/:visitorId',
    getDecks
)
router.get('/deck/:deckId', 
    getDeckById
)

router.get('/cards/:deckId',
    getCards
)

router.patch('/cards/:id', 
    body('learned')
        .isBoolean()
        .withMessage('El valor solo puede ser un booleano'),
    handleInputErrors,
    updateCard
)

router.delete('/decks/:id',
    param('id')
        .isMongoId()
        .withMessage('El id no es válido'),
    handleInputErrors,
    deleteDeck
)

export default router