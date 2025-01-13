import { UserModel } from "~/server/models/user";

export default eventHandler(async (event) => {
    const { email } = getQuery(event);

    if (typeof email !== "string") {
        throw createError({ statusMessage: "Invalid email", statusCode: 400 });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw createError({ statusMessage: "Not found", statusCode: 404 });
    }

    return user;
});
