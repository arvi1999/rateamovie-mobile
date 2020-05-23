import { Component, OnInit } from '@angular/core';
import { Auth } from '../models/Auth';
// import { }
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { setString, getString } from 'tns-core-modules/application-settings';
import { SnackBar } from 'nativescript-material-snackbar';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private apiService: ApiService,
              private router: Router) { }

  public auth: Auth;
  public registerMode: boolean;

  

  ngOnInit(): void {
    this.registerMode = false;
    const token = getString("login-token");
    if(token) {
      this.router.navigate(['/items']);
    } else {
      this.auth = {username: "", password: ""};
    }
  }s

  saveForm() {
    const snackbar = new SnackBar();
    if(this.registerMode) {
      this.apiService.registerUser(this.auth.username, this.auth.password).subscribe(
        (result) => this.login(),
        error => snackbar.simple("Registration Failed", 'red', 'white')
      );
    } else {
      this.login();
    }
    
  }

  login() {
    const snackbar = new SnackBar();
    this.apiService.loginUser(this.auth.username, this.auth.password).subscribe(
      (result:any) => {
        setString("login-token", result.token)
        this.router.navigate(['/items']);
      },
      error => snackbar.simple('Wrong Credentials', 'red', "white")
    );
  }

}
