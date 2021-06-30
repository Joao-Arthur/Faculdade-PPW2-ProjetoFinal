import mongoose, { Schema } from 'mongoose';

const band = new Schema(
    {
        name: String,
        members: [String],
        foundation: Number,
        dissolution: Number
    },
    { timestamps: true }
);

const Band = mongoose.model('Band', band);

export default Band;
