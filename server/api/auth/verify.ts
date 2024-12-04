import { UserModel } from '~/server/models/user';
import connectDB from '~/server/utils/db';

connectDB();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    if (!query.email) {
        throw createError({
            statusCode: 400,
            message: 'Invalid query parameters.',
        });
    }
    const email = query.email;
  
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found.',
      });
    }
  
    user.verified = true;
    await user.save();
  
    return { message: 'Account verified successfully.' };
  });
  