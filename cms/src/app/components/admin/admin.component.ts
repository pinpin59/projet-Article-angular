import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  data: any;
  articles:any;
  authors:any;
  selectedArticleChange?: string;
  selectedFeaturedArticle?:string;
  currentArticle : any;
  currentAuthor:any;
  selectedAuthorChange?:string;
  formCurrentArticle!: FormGroup;

  constructor(private dataService: DataService,private formBuilder: FormBuilder){
    this.formCurrentArticle = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      summary: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe((result) => {
      this.data = result;
      console.log(this.data)
      this.articles = result.articles
      this.authors = result.authors
      console.log(this.articles)
    });
  }

  onSelectChange() {
    console.log('Option sélectionnée :', this.selectedArticleChange);
    this.currentArticle = this.data.articles.filter((article: { id: string | undefined; }) => article.id === this.selectedArticleChange);
    console.log(this.currentArticle[0].title)
    if (this.currentArticle) {
      this.formCurrentArticle.patchValue({
        title: this.currentArticle[0].title,
        content: this.currentArticle[0].content,
        summary: this.currentArticle[0].summary
      });
    }
  }

  onSelectAuthorChange() {
    console.log('Option sélectionnée :', this.selectedAuthorChange);
    this.currentAuthor = this.data.authors.filter((author: { id: string | undefined; }) => author.id === this.selectedAuthorChange);
    console.log(this.currentAuthor)
  }

  changeFeaturedArticle() {
    if (this.selectedFeaturedArticle) {
      this.dataService.updateFeaturedArticle(this.selectedFeaturedArticle).subscribe(
        (response) => {
          console.log('Article vedette mis à jour avec succès.', response);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'article vedette :', error);
        }
      );
    }
  }

  updateArticle() {
    const articleId = this.selectedArticleChange;
    const updatedArticleData = this.formCurrentArticle.value;
    if(articleId && updatedArticleData){
      this.dataService.updateArticle(articleId, updatedArticleData)
      .subscribe(updatedArticle => {
        console.log('Article mis à jour avec succès :', updatedArticle);
      });
    }
  }
   

}
