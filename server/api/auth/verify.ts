import { UserModel } from "~/server/models/user";
import connectDB from "~/server/utils/db";
import jwt from "jsonwebtoken";

connectDB();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    if (!query.token) {
        throw createError({
            statusCode: 400,
            message: "Invalid query parameters.",
        });
    }
    const token = String(query.token);

    try {
        // Decodifica del token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET ?? "very_SAWcret_string"
        );
        const email = (decoded as jwt.JwtPayload).email;

        // Trova l'utente nel database
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw createError({
                statusCode: 404,
                message: "User not found.",
            });
        }

        if (user.verified) {
            return {
                message: "User is already verified.",
            };
        }

        user.verified = true;
        await user.save();
        console.log("ciaooo2");

        return { message: "Account verified successfully." };
    } catch (error) {
        throw createError({
            statusCode: 400,
            message: "Invalid or expired token.",
        });
    }
});
