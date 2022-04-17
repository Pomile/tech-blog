import mongoose from 'mongoose';
const { Schema } = mongoose;

  export const tokenSchema = new Schema({
    email:  { type: String},
    type: { type: String},
    token:   { type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }, { autoIndex: false });