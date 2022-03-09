
import { mongoose, db } from '../../config/database'
import { userSchema } from "./user.schema";

export const User = mongoose.model('User', userSchema);
