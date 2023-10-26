import { Author } from './author.model'; 
export class Article {
    id: string;
    imageUrl: string;
    title: string;
    summary: string;
    content: string;
    author: Author;
    keywords: string[];
  
    constructor(
      id: string,
      imageUrl: string,
      title: string,
      summary: string,
      content: string,
      author: Author,
      keywords: string[]
    ) {
      this.id = id;
      this.imageUrl = imageUrl;
      this.title = title;
      this.summary = summary;
      this.content = content;
      this.author = author;
      this.keywords = keywords;
    }
  }