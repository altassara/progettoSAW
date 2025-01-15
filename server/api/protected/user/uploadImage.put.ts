import { UserModel } from "~/server/models/user";
import fs from "fs";
import path from "path";
import { IncomingForm } from "formidable";
import { getToken } from "#auth";

export default eventHandler(async (event) => {
    const form = new IncomingForm();

    form.parse(event.node.req, async (err, fields, files) => {
        if (err) {
            return sendError(
                event,
                createError({
                    statusCode: 400,
                    message: "Error processing the form",
                })
            );
        }

        const { email } = fields as unknown as { email: string };
        const file = files?.image ? files.image[0] : undefined;

        const token = await getToken({ event });

        if (email[0] !== token?.email) {
            return sendError(
                event,
                createError({
                    statusCode: 403,
                    message: "Forbidden",
                })
            );
        }

        // Verifica che l'email e il file siano presenti
        if (!email || !file) {
            return sendError(
                event,
                createError({
                    statusCode: 400,
                    message: "Email and image are required",
                })
            );
        }

        const ext = path.extname(file.originalFilename || "");
        const newFileName = `${email}${ext}`; // Nome file: email.estensione

        const uploadDir = path.join(process.cwd(), "public", "profileImages");
        const filePath = path.join(uploadDir, newFileName);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filesInDir = fs.readdirSync(uploadDir);
        filesInDir.forEach((existingFile) => {
            const fileBaseName = path.basename(
                existingFile,
                path.extname(existingFile)
            );
            if (
                Array.isArray(email)
                    ? email.includes(fileBaseName)
                    : fileBaseName === email
            ) {
                const existingFilePath = path.join(uploadDir, existingFile);
                fs.unlinkSync(existingFilePath); // Rimuove il file esistente
            }
        });

        fs.renameSync(file.filepath, filePath);

        const imageUrl = `/profileImages/${newFileName}`;
        try {
            const user = await UserModel.findOneAndUpdate(
                { email },
                { $set: { image: imageUrl } },
                { new: true }
            );

            if (!user) {
                return sendError(
                    event,
                    createError({ statusCode: 404, message: "User not found" })
                );
            }

            return send(event, { imageUrl });
        } catch (error) {
            return sendError(
                event,
                createError({ statusCode: 500, message: "Error updating user" })
            );
        }
    });
});
