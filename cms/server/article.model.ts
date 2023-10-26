import mongoose, { Document, Schema, Model } from 'mongoose';

interface Article {
  id: string;
  imageUrl: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  keywords: string[];
}

const articleSchema = new Schema<Article>({
  id: String,
  imageUrl: String,
  title: String,
  summary: String,
  content: String,
  author: String,
  keywords: [String],
});

export const ArticleModel: Model<Article> = mongoose.model('Article', articleSchema);
