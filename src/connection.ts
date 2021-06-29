import mongoose from 'mongoose';

export async function setupConnection() {
    const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`;

    try {
        const client = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await client.connection.close();
    } catch (e) {
        console.log(e);
    }
}
