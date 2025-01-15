import { ReviewModel } from "~/server/models/review";
import { isValidObjectId } from "mongoose";

export default eventHandler(async (event) => {
    const { userId, paintingId } = getQuery(event);
    if (userId) {
        if (!isValidObjectId(userId)) {
            throw createError({
                statusCode: 400,
                message: "Invalid userId.",
            });
        }

        const reviews = await ReviewModel.find({ user: userId })
            .populate("painting")
            .populate("user");
        return reviews;
    }

    if (paintingId) {
        if (!isValidObjectId(paintingId)) {
            throw createError({
                statusCode: 400,
                message: "Invalid paintingId.",
            });
        }
        const reviews = await ReviewModel.find({ painting: paintingId })
            .populate("painting")
            .populate("user");
        return reviews;
    }

    throw createError({
        statusCode: 400,
        message:
            "You must pass either 'userId' or 'paintingId' as parameter in the URL.",
    });
});
