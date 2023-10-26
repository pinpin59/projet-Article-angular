import { Injectable } from '@angular/core';
import { ArticleMockup } from './model/article-mockup.model';
import { Article } from './model/article.model';
@Injectable({
  providedIn: 'root'
})
export class ModelService {

  getFeaturedArticle(): Article {
    const randomIndex = Math.floor(Math.random() * ArticleMockup.articles.length);
    return ArticleMockup.articles[randomIndex];
  }

  getArticles(): Article[] {
   
    return ArticleMockup.articles;
  }


  getOneArticle(id :number):Article {
   
    return ArticleMockup.articles[id];
  }

  getArticleByAuthor(authorId: string): Article[] | Article | undefined {
    //return ArticleMockup.articles.find((article) => article.author.id === authorId);
    return ArticleMockup.articles.filter((article) => article.author.id === authorId);
  }

  // getArticlesByKeywords(keywords: string[]): Article[] {
  //   return ArticleMockup.articles.filter((article) => {
  //     return article.keywords.some((keyword) => keywords.includes(keyword));
  //   });
  // }

  getArticlesByKeywords(keywords: string[], excludeArticleId: string): Article[] {
    return ArticleMockup.articles.filter(article => {
      // Vérifie si l'article n'est pas l'article unique et a au moins un mot-clé en commun
      return article.id !== excludeArticleId && article.keywords.some(keyword => keywords.includes(keyword));
    });
  }
  
}