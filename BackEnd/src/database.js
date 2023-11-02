import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const db = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB is connected'))
    .catch((err) => console.error(err))