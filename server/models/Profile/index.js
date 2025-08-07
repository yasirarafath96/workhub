import mongoose from 'mongoose';
const { Schema } = mongoose;

const profileSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    firstName: String,
    lastName: String,
    email: String,
    name: String,
    age: String,
    gender: String,
    comments: [{ body: String, date: Date }],
    createdDate: { type: Date, default: Date.now },
});

export default mongoose.model('Profile', profileSchema)