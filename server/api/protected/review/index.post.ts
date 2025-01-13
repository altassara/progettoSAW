import Joi from "joi";
import { ReviewModel } from "~/server/models/review";
import { PaintingModel } from "~/server/models/painting";
import { UserModel } from "~/server/models/user";
import { getToken } from "#auth";

const reviewSchema = Joi.object({
    painting: Joi.string().required(),
    user: Joi.string().email().required(),
    rating: Joi.number().integer().min(1).max(10).required(),
    description: Joi.string().optional(),
});

export default eventHandler(async (event) => {
    const { painting, user, rating, description } = await readBody(event);
    const { error } = reviewSchema.validate({
        painting,
        user,
        rating,
        description,
    });

    if (error) {
        throw createError({
            statusCode: 400,
            message: `Validation Error: ${error.details[0].message}`,
        });
    }

    const paintingDoc = await PaintingModel.findOne({ title: painting });
    if (!paintingDoc) {
        throw createError({
            statusCode: 404,
            message: "Painting not found.",
        });
    }

    const token = await getToken({ event });

    if (user !== token?.email) {
        throw createError({
            statusCode: 403,
            message: "Forbidden",
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
        painting: paintingDoc._id,
        user: userDoc._id,
        rating,
        description,
    });

    await newReview.save();

    return newReview;
});
