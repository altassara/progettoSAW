import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
        painting: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Painting",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 10, // Opzionale: Impostiamo il rating tra 1 e 10
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const ReviewModel = mongoose.model("Review", ReviewSchema);
