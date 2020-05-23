import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie';
import { ApiService } from "../api.service";
import { SnackBar } from 'nativescript-material-snackbar';
 
// import { Item } from "./item";
// import { RouterExtensions } from "nativescript-angular/router";

import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'ns-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) { }

  movie: Movie;
  movieTitle: string;

  ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        if(id >= 0) {
          this.getDetails(id);
        } else {
          this.movie = {title:"", description:""};
        }
  }

  getDetails(id:number) {
    this.apiService.getmovie(id).subscribe(
        (data: Movie) =>  {
          this.movie = data;
          this.movieTitle = this.movie.title;
        },
        error => console.log(error)
    );
  }

  editClicked() {
    // this.router.navigate(['/edit', this.movie.id]);
  }

  goBack() {
    // this.routerExtensions.backToPreviousPage();
  }

  deleteMovie() {
    const snackbar = new SnackBar();
    this.apiService.deletemovie(this.movie.id).subscribe(
      result => {
        snackbar.simple("Movie deleted", 'white', 'red');
        this.router.navigate(['/items']);
      },
      error => console.log(error)
    );
  }


  saveForm() {
    const snackbar = new SnackBar();
    if(this.movie.id) {
      this.apiService.updatemovie(this.movie.id, this.movie.title, this.movie.description).subscribe(
        result => {
          snackbar.simple("Movie details updated", 'white', 'green');
          this.router.navigate(['/items']);
        },
        error => console.log(error)
      );
    } else {
      this.apiService.createmovie(this.movie.title, this.movie.description).subscribe(
        result =>  {
          snackbar.simple("New Movie created", 'white', 'green');
          this.router.navigate(['/items']);
        },
        error => console.log(error)
      );
    }
  }

}
