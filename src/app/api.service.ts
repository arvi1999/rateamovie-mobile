import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Movie } from './models/Movie';
import { getString } from "tns-core-modules/application-settings";
// import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://192.168.42.245:8000/';
  baseMovieUrl = `${this.baseUrl}api/movies/`;

  
  headers = new HttpHeaders({
    // 'Accept': 'application/json;odata=verbose',
    'Content-Type':'application/json'
  });

  private movies = [];

  constructor(private httpClient : HttpClient,
              // private cookieService: CookieService
              ) { }

  getmovies() {
    return this.httpClient.get<Movie[]>(this.baseMovieUrl, {headers : this.getAuthHeader()});
  }

  getmovie(id: number) {
    return this.httpClient.get<Movie>(`${this.baseMovieUrl}${id}/`, {headers : this.getAuthHeader()});
  }

  ratemovie(rate:number, movieId: number) {
    const body = JSON.stringify({'stars':rate});
    return this.httpClient.post(`${this.baseMovieUrl}${movieId}/rate_movie/`, body, {headers : this.getAuthHeader()});
  }

  createmovie(title: string, description: string) {
    const body = JSON.stringify({title, description});
    return this.httpClient.post(`${this.baseMovieUrl}`, body, {headers : this.getAuthHeader()});
  }

  updatemovie(id: number, title: string, description: string) {
    const body = JSON.stringify({id, title, description});
    return this.httpClient.put(`${this.baseMovieUrl}${id}/`, body, {headers : this.getAuthHeader()});
  }

  deletemovie(id: number) {
    return this.httpClient.delete(`${this.baseMovieUrl}${id}/`, {headers : this.getAuthHeader()});
  }

  loginUser(username: string, password: string) {
    const body = JSON.stringify({username, password});
    return this.httpClient.post(`${this.baseUrl}auth/`, body, {headers : this.headers});
  }

  registerUser(username: string, password: string) {
    const body = JSON.stringify({username, password});
    return this.httpClient.post(`${this.baseUrl}api/users/`, body, {headers : this.headers});
  }

  getAuthHeader() {
    const token = getString("login-token");
    return new HttpHeaders({
      // 'Accept': 'application/json;odata=verbose',
      'Content-Type':'application/json',
      // application/json;odata=verbose
      Authorization : `Token ${token}`
    });
  }
}
