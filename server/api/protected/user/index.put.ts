import { UserModel } from "~/server/models/user";
import { getToken } from "#auth";

export default eventHandler(async (event) => {
    const { userUpdated } = await readBody(event);
    const token = await getToken({ event });

    if (userUpdated.email !== token?.email) {
        throw createError({ statusMessage: "Forbidden", statusCode: 403 });
    }

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
