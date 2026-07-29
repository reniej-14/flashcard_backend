import mongoose, { Schema } from "mongoose";

export interface IDeck {
    visitorId: string
    name: string
}

const deckSchema = new Schema({
    visitorId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const Deck = mongoose.model<IDeck>('deck', deckSchema)
export default Deck