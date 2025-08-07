import mongoose from "mongoose";

const connectDB = async () => {
    console.log('--connectDB--')
    try {
        const conn = await mongoose.connect('mongodb+srv://yasirarafathmunvw:SjGwYC9CkouadR4F@cluster0.cmpgmmq.mongodb.net/rest');
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

export default connectDB;