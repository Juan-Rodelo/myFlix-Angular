import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


// custom components
import { ProfileComponent } from '../profile/profile.component';

// material modules
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

const username = localStorage.getItem('username')

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * opens modal user details
   */
  openUserProfile(): void {
    this.dialog.open(ProfileComponent, {
      width: '500px'
    });
  }

  /**
   * navigates to  "all movies"
   */
  openAllMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * navigates to "favoritemovies"
   */
  openFavorites(): void {
    this.router.navigate(['favorites'])
  }

  /**
   * logs out the user by clearing the localstorage and reloads the page
   * redirect to welcome page
   */
  logOut(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('username')

    this.router.navigate(['welcome']);
    this.snackBar.open('Logout successful!', 'OK', {
      duration: 3000
    });
  }

}
