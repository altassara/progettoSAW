import { UserModel } from "~/server/models/user"

export default eventHandler(async (event) => {
    const {email} = getQuery(event)
    console.log('email', email)
    const user = await UserModel.findOne({ email })
    
    if (!user) {
        throw createError({ statusMessage: 'Not found', statusCode: 404 })
    }
    
    return user
})