import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from 'src/app/model.service';
import { Article } from 'src/app/model/article.model';
import { Author } from '../../model/author.model';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent {
  articleId!: string;
  author ?: Author;
  authorArticle ?: any;
  constructor(private route: ActivatedRoute,private modelService: ModelService){
    
  }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.params['id'];
    this.author = this.modelService.getOneArticle(+this.articleId - 1).author;
    console.log(this.author)
    this.authorArticle = this.modelService.getArticleByAuthor(this.author.id)
    console.log(this.authorArticle)
    //console.log(this.modelService.getOneArticle(+this.articleId - 1));
  }

  
}
