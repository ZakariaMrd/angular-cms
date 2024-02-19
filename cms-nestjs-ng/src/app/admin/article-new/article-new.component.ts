import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
})
export class ArticleNewComponent implements OnInit {
  response$: Observable<Article>;
  error = null;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService
  ) {this.response$ = EMPTY;}

  articleForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    content: ['', [Validators.required, Validators.minLength(10)]],
    creationDate: new Date().toISOString(),
  });

  ngOnInit() {}

  async onSubmit() {
    //console.log(this.articleForm.value)
    this.response$ = await this.articleService
      .createArticle(this.articleForm.value)
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
