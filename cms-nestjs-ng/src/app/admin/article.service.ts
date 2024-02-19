import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private baseUrl = 'http://localhost:3000/articles';
  private httpHeaders = {
    headers: { 'Content-Type': 'application/json' },
  };

  constructor(private httpClient: HttpClient) {}

  createArticle(article: Article) {
    return this.httpClient.post<Article>(this.baseUrl, article);
  }

  deleteArticle(article: Article) {
    const url = `${this.baseUrl}/${article._id}`;
    return this.httpClient.delete<Article>(url, this.httpHeaders);
  }
  updateArticle(id: string, article: Article) {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put<Article>(url, article, this.httpHeaders);
  }
}
