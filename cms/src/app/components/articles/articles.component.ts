import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ModelService } from 'src/app/model.service';
import { Article } from 'src/app/model/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles? : Article[]
  data : any;
  featuredArticle: any;
  matchedArticleId:any;
  randomArticle ?: Article;
  constructor(private modelService: ModelService, private dataService: DataService){

  }
 ngOnInit(): void {
   this.articles = this.modelService.getArticles()
   this.randomArticle = this.modelService.getFeaturedArticle()
   this.dataService.getData().subscribe((result) => {
    this.data = result;
    console.log(result)
    this.loadFeaturedArticle();

    });

  this.dataService.getFeaturedArticle().subscribe((result) =>{
    this.featuredArticle = result;
    console.log(this.featuredArticle)
    this.loadFeaturedArticle();

  })

 }

 ngAfterViewInit(){
 }

 loadFeaturedArticle(){
  if (this.featuredArticle && this.data) {
    const matchingArticle = this.data.articles.find((article:any) => article.id === this.featuredArticle.featured_article);

    if (matchingArticle) {
      this.matchedArticleId = matchingArticle;
      console.log('ID de l\'article vedette correspondant :', this.matchedArticleId);
    } else {
      console.log('Aucun article vedette correspondant trouvé dans les données.');
    }
  }
 }
}
