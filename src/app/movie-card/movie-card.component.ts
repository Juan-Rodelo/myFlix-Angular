// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchDataApiService } from '../fetch-api-data.service'

import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';


import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const user = localStorage.getItem('username');

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  user: any = {};
  favorites: any = [];
  movies: any[] = [];
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchDataApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  /**
   * gets movies and favoritemovies 
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  /**
   * gets all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * gets the users favorite movies
   */
  getUsersFavs(): void {
    let user = localStorage.getItem('username')
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      console.log(resp);
      this.favs = resp.FavoriteMovies;
      console.log(this.favs, 'favs');
      return this.favs;
    })
  }

  /**
   * opens genre modal 
   * @param name (genre name)
   * @param description (genre description)
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '500px'
    });
  }

  /**
   * opens director modal 
   * @param name (director name)
   * @param bio (director bio)
   * @param birthYear (director birthYear)
   * @param deathYear (director deathYear)
   */
  openDirector(name: string, bio: string, birthYear: number, deathYear: number): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, bio, birthYear, deathYear },
      width: '500px'
    });
  }

  /**
   * opens synopsis modal 
   * @param title (movie title)
   * @param imageUrl (movie image/cover)
   * @param description (movie description)
   * @param year (year of release)
   */
  openSynopsis(title: string, imageUrl: any, description: string, year: number): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { title, imageUrl, description, year },
      width: '500px'
    });
  }

  /**
   * adds the movie to  users favoritemovies 
   * @param id (movie._id - unique identifier)
   * @param title (movie title)
   * @returns a status message - success/error
   */
  addToUserFavorites(id: string, title: string): void {
    this.fetchApiData.addToFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favorites.`, 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
        window.location.reload()
      }, 3000);
    });
    return this.getUsersFavs();
  }

  /**
   * removes the movie  users favoritemovies 
   * @param id (movie._id - unique identifier)
   * @param title (movie title)
   * @returns a status message - success/error
   */
  removeFromUserFavorites(id: string, title: string): void {
    this.fetchApiData.removeFromFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been removed from your favorites.`, 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
        window.location.reload()
      }, 3000);
    });
    return this.getUsersFavs();
  }

  /**
   * Compares movie id's with getUsersFavs returned list to display the favorite movie icon 
   * @param id 
   * @returns 
   */

  displayfavsbutton(movieid: string) {
    return this.favs.includes(movieid)
  }

  setFavStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

}