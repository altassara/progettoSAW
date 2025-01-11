import { UserModel } from "~/server/models/user";
import fs from "fs";
import path from "path";
import { IncomingForm } from "formidable";

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

        // Ottieni l'email e il file immagine dal body
        const { email } = fields;
        const file = files?.image ? files.image[0] : undefined;

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

        // Percorso di salvataggio
        const uploadDir = path.join(process.cwd(), "public", "profileImages");
        const filePath = path.join(uploadDir, newFileName);

        // Assicurati che la cartella esista
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Rimuovi qualsiasi file esistente con lo stesso nome dell'email (indipendentemente dall'estensione)
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

        // Sposta il nuovo file nella directory di destinazione
        fs.renameSync(file.filepath, filePath);

        // Aggiorna l'utente nel database con il nuovo URL dell'immagine
        const imageUrl = `/profileImages/${newFileName}`;
        try {
            const user = await UserModel.findOneAndUpdate(
                { email },
                { $set: { image: imageUrl } }, // Usa $set per aggiornare solo il campo image
                { new: true } // Restituisce il documento aggiornato
            );

            if (!user) {
                return sendError(
                    event,
                    createError({ statusCode: 404, message: "User not found" })
                );
            }

            // Rispondi con l'URL dell'immagine
            return send(event, { imageUrl });
        } catch (error) {
            return sendError(
                event,
                createError({ statusCode: 500, message: "Error updating user" })
            );
        }
    });
});
