import mongoose, { Schema } from 'mongoose';

const user = new Schema(
    {
        name: String,
        username: String,
        hash: String,
        salt: String
    },
    { timestamps: true }
);

const User = mongoose.model('User', user);

export default User;
