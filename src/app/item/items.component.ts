import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ApiService } from "../api.service";
import { Movie } from "../models/Movie";
import { Router } from "@angular/router";
import { remove } from "tns-core-modules/application-settings";
import { SnackBar } from 'nativescript-material-snackbar';

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    movies: Array<Movie>;

    constructor(private apiService: ApiService,
        private router: Router) { }

    ngOnInit(): void {
        this.apiService.getmovies().subscribe(
            (movie: Movie[]) => 
            {
                this.movies = movie;
                // console.log(movie);
            },
            error => console.log(error)
        );
    }

    createMovie() {
        this.router.navigate(['/edit', -1]);
    }

    logout() {
        const snackbar = new SnackBar();
        snackbar.simple("Successfully logged out", 'white', 'green');
        remove("login-token");
        this.router.navigate(['/auth']);
    }
}
