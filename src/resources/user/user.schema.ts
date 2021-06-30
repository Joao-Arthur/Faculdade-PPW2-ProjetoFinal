import mongoose, { Schema } from 'mongoose';

const User = mongoose.model(
    'User',
    new Schema(
        {
            name: String,
            username: String,
            hash: String,
            salt: String
        },
        { timestamps: true }
    )
);

export default User;
