import { UserModel } from '~/server/models/user';

export default defineEventHandler(async (event) => {
  const { email } = getQuery(event); // Ricevi l'email dal client

  if (!email) {
    throw createError({ statusCode: 400, message: 'Email is required.' });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw createError({ statusCode: 404, message: 'User not found.' });
  }

  return { verified: user.verified };
});
