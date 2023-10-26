import { Article } from './article.model';
import { Author } from './author.model';

export class ArticleMockup {
  static authors: Author[] = [
    new Author('1', 'Auteur 1', 'Bio de l\'auteur 1'),
    new Author('2', 'Auteur 2', 'Bio de l\'auteur 2'),
    new Author('3', 'Auteur 3', 'Bio de l\'auteur 3'),
  ];

  static articles: Article[] = [
    new Article('1', 'url1.jpg', 'Titre de l\'article 1', 'Résumé de l\'article 1', 'Contenu de l\'article 1', ArticleMockup.authors[0], ['Lecture']),
    new Article('2', 'url2.jpg', 'Titre de l\'article 2', 'Résumé de l\'article 2', 'Contenu de l\'article 2', ArticleMockup.authors[1], ['Cinema']),
    new Article('3', 'url3.jpg', 'Titre de l\'article 3', 'Résumé de l\'article 3', 'Contenu de l\'article 3', ArticleMockup.authors[2], ['Cuisine', 'Cinema']),
    new Article('4', 'url4.jpg', 'Titre de l\'article 4', 'Résumé de l\'article 4', 'Contenu de l\'article 4', ArticleMockup.authors[0], ['Cuisine']),
    new Article('5', 'url5.jpg', 'Titre de l\'article 5', 'Résumé de l\'article 5', 'Contenu de l\'article 5', ArticleMockup.authors[1], ['Lecture','Cuisine']),
  ];
}



