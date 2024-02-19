import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/models/article';
import { ArticleService } from '../article.service';
import { EMPTY, throwError,catchError, Observable } from 'rxjs';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css'],
})
export class ArticleEditComponent implements OnInit {
  @Input() article!: Article;
  articleForm!: FormGroup;
  response$!: Observable<Article>;
  error = null;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: [this.article.title, Validators.required],
      content: [
        this.article.content,
        [Validators.required, Validators.minLength(10)],
      ],
    });
  }

  async submit() {
    this.error = null;
    this.response$ = this.articleService
      .updateArticle(this.article._id!, this.articleForm.value)
      .pipe(
        catchError((error) => {
          this.error = error;
          return EMPTY;
        })
      );
  }

  get title() {
    return this.articleForm.get('title');
  }
  get content() {
    return this.articleForm.get('content');
  }

}
