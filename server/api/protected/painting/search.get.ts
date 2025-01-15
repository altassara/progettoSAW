import { PaintingModel } from "~/server/models/painting";
import Joi from "joi";

export default eventHandler(async (event) => {
    // Schema di validazione
    const schema = Joi.object({
        title: Joi.string().allow(null, "").max(100),
        artist: Joi.string().allow(null, "").max(100),
        yearFrom: Joi.number()
            .integer()
            .min(0)
            .max(new Date().getFullYear())
            .allow(null, ""),
        yearTo: Joi.number()
            .integer()
            .min(0)
            .max(new Date().getFullYear())
            .allow(null, ""),
        category: Joi.string().allow(null, "").max(50), // Categoria massimo 50 caratteri
        maxPainting: Joi.number().integer().min(1).max(100).default(50), // Limite massimo tra 1 e 100
    });

    const queryParams = getQuery(event);

    const { error, value } = schema.validate(queryParams, {
        abortEarly: false,
    });
    if (error) {
        return {
            statusCode: 400,
            body: {
                error: "Validation error",
                details: error.details.map((detail) => detail.message),
            },
        };
    }

    const { title, artist, yearFrom, yearTo, category, maxPaintings } = value;

    const query = {} as any;
    if (title) query.title = { $regex: title, $options: "i" };
    if (artist) query.artist = { $regex: artist, $options: "i" };
    if (yearFrom || yearTo) query.year = {};
    if (yearFrom) query.year.$gte = yearFrom;
    if (yearTo) query.year.$lte = yearTo;
    if (category) query.category = { $regex: category, $options: "i" };

    const limit = maxPaintings;

    const paintings = await PaintingModel.find(query).limit(limit);

    return paintings;
});
