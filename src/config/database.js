import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb'

dotenv.config();
const uri = process.env.DATABASE_URI;
const db = mongoose.connect(uri, { maxPoolSize: 20 });

module.exports = { 
    db,
    mongoose,
    mongoClient: MongoClient
};
