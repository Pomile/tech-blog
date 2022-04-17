
import { mongoose, db } from '../../config/database'
import { tokenSchema } from "./token.schema";

export const Token = mongoose.model('Token', tokenSchema);
