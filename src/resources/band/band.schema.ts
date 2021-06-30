import mongoose, { Schema } from 'mongoose';

const Band = mongoose.model(
    'Band',
    new Schema(
        {
            name: String,
            members: [String],
            foundation: Number,
            dissolution: Number
        },
        { timestamps: true }
    )
);

export default Band;
