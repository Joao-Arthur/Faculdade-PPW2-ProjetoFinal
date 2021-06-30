import mongoose, { Schema } from 'mongoose';

const song = new Schema(
    {
        name: String,
        length: Number
    },
    { timestamps: true }
);

const Song = mongoose.model('Song', song);

export default Song;
