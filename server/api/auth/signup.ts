import { hash } from 'bcrypt';
import { UserModel } from '~/server/models/user';
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  // Verifica che l'email non esista già
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: 'Email already in use.',
    });
  }

  // Hash della password
  const hashedPassword = await hash(password, 10);

  // Creazione dell'utente
  const newUser = new UserModel({
    email,
    password: hashedPassword,
    createdAt: new Date(),
    verified: false,
  });

  await newUser.save();

  // Invia una mail di verifica
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // o il tuo provider SMTP
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const verificationLink = `${process.env.BASE_URL}/verify?email=${email}`;
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Verify your account',
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your account.</p>`,
  });

  return {
    message: 'User registered. Please check your email to verify your account.',
  };
});
