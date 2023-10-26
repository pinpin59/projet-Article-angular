import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from 'src/app/model.service';
import { Article } from 'src/app/model/article.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  articleId!: string;
  article ?: Article;
  articlesKeywords ?: Article[];
  constructor(private route: ActivatedRoute,private modelService: ModelService){
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const articleId = params.get('id');
      //this.articleId = this.route.snapshot.params['id'];
      if(articleId){
        this.article = this.modelService.getOneArticle(+articleId - 1);
        this.articlesKeywords = this.modelService.getArticlesByKeywords(this.article.keywords, articleId)
        
      }
      
    });
   
  }
}
