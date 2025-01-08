import { PaintingModel } from "~/server/models/painting";

export default eventHandler(async (event) => {
    const {
        title,
        artist,
        yearFrom,
        yearTo,
        category,
        maxPaintings = 10,
    } = getQuery(event);

    const query = {} as any;
    if (title) query.title = { $regex: title, $options: "i" };
    if (artist) query.artist = { $regex: artist, $options: "i" };
    if (yearFrom || yearTo) query.year = {};
    if (yearFrom) query.year.$gte = yearFrom;
    if (yearTo) query.year.$lte = yearTo;
    if (category) query.category = { $regex: category, $options: "i" };

    const limit = Math.max(
        1,
        Math.min(parseInt(maxPaintings as string, 10), 100)
    );

    const paintings = await PaintingModel.find(query).limit(limit);

    return paintings;
});
