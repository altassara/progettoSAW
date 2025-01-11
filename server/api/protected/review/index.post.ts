import { ReviewModel } from "~/server/models/review";
import { PaintingModel } from "~/server/models/painting";
import { UserModel } from "~/server/models/user";

export default eventHandler(async (event) => {
    const { painting, user, rating, description } = await readBody(event);

    const paintingDoc = await PaintingModel.findOne({ title: painting });
    if (!paintingDoc) {
        throw createError({
            statusCode: 404,
            message: "Painting not found.",
        });
    }

    const userDoc = await UserModel.findOne({ email: user });
    if (!userDoc) {
        throw createError({
            statusCode: 404,
            message: "User not found.",
        });
    }

    const existingReview = await ReviewModel.findOne({
        painting: paintingDoc._id,
        user: userDoc._id,
    });
    if (existingReview) {
        throw createError({
            statusCode: 400,
            message: "You have already reviewed this painting.",
        });
    }

    const newReview = new ReviewModel({
        painting: paintingDoc._id, // uso l'ID del quadro
        user: userDoc._id, // uso l'ID dell'utente
        rating,
        description,
    });

    await newReview.save();

    return newReview;
});
