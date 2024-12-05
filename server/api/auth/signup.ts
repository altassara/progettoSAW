import { hash } from "bcrypt";
import { UserModel } from "~/server/models/user";
import nodemailer from "nodemailer";
import connectDB from "~/server/utils/db";
import jwt from "jsonwebtoken";

connectDB();

export default defineEventHandler(async (event) => {
    const { email, password, name } = await readBody(event);
    console.log(email + password + name);
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw createError({
            statusCode: 400,
            message: "Email already in use.",
        });
    }
    // Hash della password
    const hashedPassword = await hash(password, 10);

    // Creazione dell'utente
    const newUser = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
        verified: false,
    });

    await newUser.save();

    const verificationToken = jwt.sign(
        { email: newUser.email },
        process.env.JWT_SECRET ?? "very_SAWcret_string",
        { expiresIn: "1h" }
    );

    // Invia una mail di verifica
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE ?? "yahoo",
        secure: false,
        auth: {
            user: process.env.SMTP_USER ?? "anna.bianchi007@yahoo.com",
            pass: process.env.SMTP_PASSWORD ?? "gcbycratsblrljvi",
        },
    });

    const verificationLink = `${
        process.env.BASE_URL ?? "http://localhost:3000"
    }/api/auth/verify?token=${verificationToken}`;
    await transporter.sendMail({
        from: process.env.SMTP_USER ?? "anna.bianchi007@yahoo.com",
        to: email,
        subject: "Verify your account",
        html: `<p>Click <a href="${verificationLink}">here</a> to verify your account.</p>`,
    });

    return {
        message:
            "User registered. Please check your email to verify your account.",
    };
});
