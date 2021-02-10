import { finalize, catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UnsplashPhotoService } from './../services/unsplash-photo.service';

@Component({
  selector: 'app-unsplash-toolbar',
  templateUrl: './unsplash-toolbar.component.html',
  styleUrls: ['./unsplash-toolbar.component.css'],
})
export class UnsplashToolbarComponent implements OnInit {
  show = false;
  constructor(private unsplash: UnsplashPhotoService) {}
  imageResults: { url: any; alt_description: any }[] = [];
  previousResults: { url: any; alt_description: any }[] = [];
  loading = false;
  error = '';
  currentPage = 0;
  totalPages = 0;
  key = '';
  ngOnInit(): void {}

  getPhotosByKey(key: string) {
    this.key = key;
    this.error = '';
    this.loading = true;
    this.imageResults = [];
    this.unsplash
      .searchByKeyword(key)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((err) => (this.error = err.error.errors[0]))
      )
      .subscribe((result: any) => {
        if (result.total_pages == 0) {
          this.error = 'No results. Try with different keyword';
          this.currentPage = 0;
          return;
        }
        this.currentPage = 1;
        const images = result.results;
        for (let image of images) {
          this.imageResults.push({
            url: image.urls.thumb,
            alt_description: image.alt_description,
          });
        }
        this.totalPages = result.total_pages;
        console.log(this.totalPages);
      });
  }

  nextPage() {
    this.currentPage++;
    this.error = '';
    this.loading = true;
    if (this.currentPage <= this.totalPages && this.key != '') {
      this.previousResults = this.imageResults;
      this.unsplash
        .getPage(this.key, this.currentPage.toString())
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          catchError((err) => (this.error = err.error.errors[0]))
        )
        .subscribe((result: any) => {
          this.imageResults = [];
          const images = result.results;
          for (let image of images) {
            this.imageResults.push({
              url: image.urls.thumb,
              alt_description: image.alt_description,
            });
          }
        });
    } else {
      this.currentPage = 0;
      this.error = 'Nothing to fetch next page from';
      this.loading = false;
      return;
    }
  }
  backPage() {
    this.error = '';
    if (this.currentPage != 0 && this.currentPage != 1) {
      this.imageResults = [];
      this.loading = true;
      this.currentPage--;
      this.unsplash
        .getPage(this.key, this.currentPage.toString())
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          catchError((err) => (this.error = err.error.errors[0]))
        )
        .subscribe((result: any) => {
          const images = result.results;
          for (let image of images) {
            this.imageResults.push({
              url: image.urls.thumb,
              alt_description: image.alt_description,
            });
          }
        });
    } else if (this.currentPage == 1) {
      this.loading = false;
      return;
    } else {
      this.currentPage = 0;
      this.error = 'Nothing to fetch previous page from';
      this.loading = false;
      return;
    }
  }
}
