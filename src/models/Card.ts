import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICard extends Document {
    deck: Types.ObjectId
    question: string
    response: string
    learned: boolean
}

const cardSchema = new Schema({
    deck: {
        type: Schema.Types.ObjectId,
        ref: "Deck",
        required: true
    },
    question: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    learned: {
        type: Boolean,
        default: false
    }
})

const Card = mongoose.model<ICard>('Card', cardSchema)
export default Card