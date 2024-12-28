import { UserModel } from "~/server/models/user";

export default eventHandler(async (event) => {
    const { userUpdated } = await readBody(event);

    const user = await UserModel.findOneAndUpdate(
        { email: userUpdated.email },
        userUpdated,
        { new: true }
    );

    if (!user) {
        throw createError({ statusMessage: "Not found", statusCode: 404 });
    }

    return user;
});
