import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UnsplashPhotoService {
  constructor(private http: HttpClient) {}

  searchByKeyword(key: string) {
    return this.http.get('https://api.unsplash.com/search/photos', {
      headers: {
        Authorization: 'Client-ID wJW7lhdpvEJKii2QcUjvg5HdjP_cDcTIAnj6rmKQgr4',
      },
      params: {
        query: key,
        per_page : "12"
      },
    });
  }

  getPage(key: string,pageNumber:string) {
    return this.http.get('https://api.unsplash.com/search/photos', {
      headers: {
        Authorization: 'Client-ID wJW7lhdpvEJKii2QcUjvg5HdjP_cDcTIAnj6rmKQgr4',
      },
      params: {
        query: key,
        page: pageNumber,
        per_page : "12",
      },
    });
  }
}
 