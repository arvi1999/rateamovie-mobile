import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Movie } from "../models/Movie";
import { ApiService } from "../api.service";
 
import { Item } from "./item";
import { RouterExtensions } from "nativescript-angular/router";
import { SnackBar } from 'nativescript-material-snackbar';
// import { ItemService } from "./item.service";

@Component({
    selector: "ns-details",
    templateUrl: "./item-detail.component.html",
    styleUrls: ["./item-detail.component.css"]
})
export class ItemDetailComponent implements OnInit {
    // item: Item;

    movie: Movie;
    highlight: number;

    constructor(
        // private itemService: ItemService,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private routerExtensions: RouterExtensions,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.highlight = 0;
        const id = +this.route.snapshot.params.id;
        this.getDetails(id);
    }

    setHighlight(rate) {
        this.highlight = rate;
    }

    rateClicked() {
        const snackbar = new SnackBar();
        this.apiService.ratemovie(this.highlight, this.movie.id).subscribe(
            (data) => {
                snackbar.simple(data["message"],'white', 'green');
                this.getDetails(this.movie.id);
            },
            error => snackbar.simple("Please try again",'white','red')
        );
    }

    getDetails(id:number) {
        this.apiService.getmovie(id).subscribe(
            (data: Movie) => this.movie = data,
            error => console.log(error)
        );
    }

    editClicked() {
        this.router.navigate(['/edit', this.movie.id]);
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
