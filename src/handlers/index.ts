import { Request, Response } from "express";
import { extractText } from "../utils/extractText";
import { generateQuestions } from "../utils/generateQuestions";
import Deck from "../models/Deck";
import Card from "../models/Card";

export const createDecks = async (req: Request, res: Response) => {
    const { name, visitorId } = req.body
    
    // Extraer texto del pdf
    const text = await extractText(req.file.buffer)

    // Generar las preguntas 
    const questions = await generateQuestions(text)

    const deck = await Deck.create({
        visitorId,
        name
    })

    const cards = questions.map(question => ({
        deck: deck._id,
        question: question.question,
        response: question.response
    }))

    await Card.insertMany(cards)

    console.log(questions)
    res.send('Preguntas generadas correctamente')
}

export const getDecks = async (req: Request, res: Response) => {
    try {
        const { visitorId } = req.params
        const decks = await Deck.find({visitorId})

        if (!decks) {
            return res.status(404).json({error: 'Este usuario no tiene mazos creados'})
        }

        res.json(decks)
    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}

export const getCards = async (req: Request, res: Response) => {
    try {
        const { deckId } = req.params
        const cards = await Card.find({
            deck: deckId
        })

        if (cards.length === 0) {
            return res.status(404).json({error: 'No existen preguntas'})
        }

        res.json(cards)
    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}

export const updateCard = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { learned } = req.body

        const card = await Card.findById(id)
        if (!card) {
            return res.status(404).json({error: 'No existe esta tarjeta'})
        }

        card.learned = learned
        await card.save()
        res.send('Estado de tarjeta actualizado')
    } catch (error) {
        res.status(500).json({error: 'Hubo un error y no se pudo actualizar el estado de la tarjeta'})
    }
}

export const deleteDeck = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const deck = await Deck.findById(id)
        if (!deck) {
            return res.status(404).json({error: 'El mazo no existe'})
        }

        await Card.deleteMany({
            deck: id
        })
        await deck.deleteOne()

        res.send('Mazo eliminado correctamente')
    } catch (error) {
        res.status(500).json({error: 'Hubo un error y no se pudo eliminar el mazo actual'})
    }
}
