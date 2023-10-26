import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  port:string = '3000';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  getData(): Observable<any> {
    const apiUrl = `http://localhost:${this.port}/api/alldata`; 
    return this.http.get(apiUrl);
  }

  createUser(username: string, password: string, bio: string) {
    return this.http.post(`http://localhost:${this.port}/api/signup`, { username, password, bio });
  }

  login(username: string, password: string) {
    return this.http.post(`http://localhost:${this.port}/api/login`, { username, password });
  }

  getFeaturedArticle(){
    return this.http.get(`http://localhost:${this.port}/api/featured-article`);
  }

  updateFeaturedArticle(articleId: string) {
    return this.http.put(`http://localhost:${this.port}/api/update-featured-article/${articleId}`, {})  
  }

  updateArticle(articleId: string, updatedData: any) {
    const apiUrl = `http://localhost:${this.port}/api/update-article/${articleId}`;
    return this.http.put(apiUrl, updatedData);
  }
}
