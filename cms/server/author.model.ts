// author.model.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

interface Author {
  id: string;
  name: string;
  bio: string;
}

const authorSchema = new Schema<Author>({
  id: String,
  name: String,
  bio: String,
});

export const AuthorModel: Model<Author> = mongoose.model('Author', authorSchema);