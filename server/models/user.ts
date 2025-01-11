import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    image: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    verified: { type: Boolean, required: false },
});

export const UserModel = mongoose.model("User", UserSchema);
