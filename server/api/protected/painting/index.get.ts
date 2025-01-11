import { PaintingModel } from "~/server/models/painting";

export default eventHandler(async (event) => {
    const { slug } = getQuery(event);

    if (!slug) {
        throw createError({ statusMessage: "Not found", statusCode: 404 });
    }
    const lowerCaseSlug = typeof slug === "string" ? slug.toLowerCase() : "";

    const painting = await PaintingModel.findOne({ slug: lowerCaseSlug });

    if (!painting) {
        throw createError({ statusMessage: "Not found", statusCode: 404 });
    }

    return painting;
});
