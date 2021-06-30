import mongoose, { Schema } from 'mongoose';

const album = new Schema(
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
);

const Album = mongoose.model('Album', album);

export default Album;
