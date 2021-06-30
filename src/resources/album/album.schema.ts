import mongoose, { Schema } from 'mongoose';

const Album = mongoose.model(
    'Album',
    new Schema(
        {
            title: String,
            band: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'band',
                required: true
            },
            releaseDate: Date,
            trackList: [Number]
        },
        { timestamps: true }
    )
);

export default Album;
