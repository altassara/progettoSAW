import { ReviewModel } from "~/server/models/review";
import { isValidObjectId } from "mongoose";

export default eventHandler(async (event) => {
    // Ottieni i parametri dalla URL
    const { userId, paintingId } = getQuery(event);
    // Se viene passato userId, cerchiamo le recensioni per quell'utente
    if (userId) {
        // Verifica che l'ID sia valido
        if (!isValidObjectId(userId)) {
            throw createError({
                statusCode: 400,
                message: "Invalid userId.",
            });
        }
        // Trova le recensioni per l'utente
        const reviews = await ReviewModel.find({ user: userId })
            .populate("painting")
            .populate("user");
        return reviews;
    }

    // Se viene passato paintingId, cerchiamo le recensioni per quel quadro
    if (paintingId) {
        // Verifica che l'ID sia valido
        if (!isValidObjectId(paintingId)) {
            throw createError({
                statusCode: 400,
                message: "Invalid paintingId.",
            });
        }
        // Trova le recensioni per il quadro
        const reviews = await ReviewModel.find({ painting: paintingId })
            .populate("painting")
            .populate("user");
        return reviews;
    }

    // Se non viene passato né userId né paintingId, restituisci un errore
    throw createError({
        statusCode: 400,
        message:
            "You must pass either 'userId' or 'paintingId' as parameter in the URL.",
    });
});
