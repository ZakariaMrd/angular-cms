import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ArticleService } from 'src/app/admin/article.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article-summary',
  templateUrl: './article-summary.component.html',
  styleUrls: ['./article-summary.component.css'],
})
export class ArticleSummaryComponent implements OnInit {
  isWaitingForServerResponse = false;
  error = null;

  @Output() deleteSuccess = new EventEmitter<boolean>();
  @Input() article!: Article ;
  isInEditMode = false;

  constructor(private articleService: ArticleService, public authService:AuthService) {}
  ngOnInit() {}
  delete(article: Article) {
    this.isWaitingForServerResponse = true;
    this.articleService
      .deleteArticle(article)
      .pipe(catchError(this.handleError))
      .subscribe(
        (data) => {
          this.isWaitingForServerResponse = false;
          this.handleSuccess(data);
        },
        (err) => {
          this.isWaitingForServerResponse = false;
          this.handleError(err);
        }
      );
  }

  handleSuccess(data: any) {
    console.log(data);
    this.deleteSuccess.emit(true);
  }

  handleError(error: any) {
    this.error = error;
    return throwError(this.error);
  }

  toggleReadMode() {
    this.isInEditMode = !this.isInEditMode;
  }

  reloadArticle(article: Article) {this.article = article;}
}
