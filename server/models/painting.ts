import mongoose from "mongoose";

const PaintingSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    artist: { type: String, required: true },
    year: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: false },
    rating: { type: Number, required: false },
    slug: { type: String, required: true, unique: true },
});

PaintingSchema.pre("save", function (next) {
    if (!this.slug) {
        this.slug = this.title.toLowerCase().replace(/ /g, "-"); // Sostituisce gli spazi con "-"
    }
    next();
});

export const PaintingModel = mongoose.model("Painting", PaintingSchema);
